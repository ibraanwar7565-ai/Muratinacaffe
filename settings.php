<?php
require_once __DIR__ . '/includes/auth.php';
require_permission('settings'); // managers only

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();
    $action = $_POST['action'] ?? 'save_settings';

    if ($action === 'change_password') {
        // Logged-in manager changes their own password
        $me = $pdo->prepare('SELECT password_hash FROM users WHERE id = ?');
        $me->execute([current_user()['id']]);
        $hash = $me->fetchColumn();
        $cur  = $_POST['current_password'] ?? '';
        $new  = $_POST['new_password'] ?? '';
        if (!password_verify($cur, $hash)) {
            flash('Current password is incorrect.', 'error');
        } elseif (strlen($new) < 6) {
            flash('New password must be at least 6 characters.', 'error');
        } else {
            $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
                ->execute([password_hash($new, PASSWORD_BCRYPT), current_user()['id']]);
            audit('password_change', 'Manager changed own password');
            flash('Your password has been updated.');
        }
        redirect('settings.php#security');

    } elseif ($action === 'set_pin') {
        // Set / change the manager's own login passcode (PIN)
        $pin = trim($_POST['manager_pin'] ?? '');
        if (!preg_match('/^\d{4,8}$/', $pin)) {
            flash('Manager passcode must be 4–8 digits.', 'error');
        } elseif (passcode_in_use($pin, (int) current_user()['id'])) {
            flash('That passcode is already used by another staff member.', 'error');
        } else {
            $pdo->prepare('UPDATE users SET passcode = ? WHERE id = ?')
                ->execute([password_hash($pin, PASSWORD_BCRYPT), current_user()['id']]);
            audit('manager_pin', 'Manager passcode updated');
            flash('Manager passcode updated.');
        }
        redirect('settings.php#security');

    } else {
        // Save all company / sales / receipt settings
        $logo = $_POST['existing_logo'] ?? null;
        if (!empty($_FILES['logo']['name']) && is_uploaded_file($_FILES['logo']['tmp_name'])) {
            $ext = strtolower(pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'svg'], true)) {
                $fn = 'logo_' . time() . '.' . $ext;
                move_uploaded_file($_FILES['logo']['tmp_name'], UPLOAD_DIR . '/logo/' . $fn);
                $logo = 'uploads/logo/' . $fn;
            }
        }

        $pdo->prepare(
            'UPDATE settings SET
                company_name=?, logo=?, currency=?, tax_rate=?, service_charge=?, loyalty_rate=?,
                low_stock_default=?, address=?, phone=?, email=?, kra_pin=?, default_theme=?, session_timeout=?,
                receipt_name=?, receipt_header_note=?, receipt_footer=?, receipt_width=?,
                receipt_show_logo=?, receipt_show_tax=?, receipt_show_served=?, receipt_show_customer=?
             WHERE id=1'
        )->execute([
            trim($_POST['company_name']), $logo, trim($_POST['currency']),
            (float) $_POST['tax_rate'], (float) $_POST['service_charge'], max(1, (int) $_POST['loyalty_rate']),
            max(0, (int) $_POST['low_stock_default']), trim($_POST['address']), trim($_POST['phone']),
            trim($_POST['email']), trim($_POST['kra_pin']),
            $_POST['default_theme'] === 'dark' ? 'dark' : 'light', max(1, (int) $_POST['session_timeout']),
            trim($_POST['receipt_name']), trim($_POST['receipt_header_note']), trim($_POST['receipt_footer']),
            $_POST['receipt_width'] === '58' ? '58' : '80',
            isset($_POST['receipt_show_logo']) ? 1 : 0,
            isset($_POST['receipt_show_tax']) ? 1 : 0,
            isset($_POST['receipt_show_served']) ? 1 : 0,
            isset($_POST['receipt_show_customer']) ? 1 : 0,
        ]);
        audit('settings_update', 'Company settings updated');
        flash('Settings saved.');
        redirect('settings.php');
    }
}

$s = settings();
$hasPin = !empty($s) && db()->query('SELECT passcode FROM users WHERE id = ' . (int) current_user()['id'])->fetchColumn();
$pageTitle = 'Settings';
$activeNav = 'settings';
require __DIR__ . '/includes/header.php';
?>
<ul class="nav nav-pills settings-tabs mb-3" role="tablist">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#tab-general"><i class="fa-solid fa-building"></i> General</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#tab-sales"><i class="fa-solid fa-percent"></i> Sales &amp; Tax</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#tab-receipt"><i class="fa-solid fa-receipt"></i> Receipt</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#tab-security"><i class="fa-solid fa-shield-halved"></i> Security</button></li>
</ul>

<div class="tab-content">
    <!-- ============ Company settings (one big form) ============ -->
    <form method="post" enctype="multipart/form-data">
        <?= csrf_field() ?>
        <input type="hidden" name="action" value="save_settings">
        <input type="hidden" name="existing_logo" value="<?= e($s['logo'] ?? '') ?>">

        <div class="tab-pane fade show active" id="tab-general">
            <div class="card"><div class="card-body row g-3">
                <h3 class="section-title mb-0"><i class="fa-solid fa-building"></i> Business / Company</h3>
                <div class="col-md-6"><label class="form-label">System / Company Name</label>
                    <input name="company_name" class="form-control" value="<?= e($s['company_name'] ?? '') ?>" required></div>
                <div class="col-md-3"><label class="form-label">Currency Symbol</label>
                    <input name="currency" class="form-control" value="<?= e($s['currency'] ?? 'KSh') ?>"></div>
                <div class="col-md-3"><label class="form-label">KRA / Tax PIN</label>
                    <input name="kra_pin" class="form-control" value="<?= e($s['kra_pin'] ?? '') ?>" placeholder="P0512…"></div>
                <div class="col-md-6"><label class="form-label">Phone</label>
                    <input name="phone" class="form-control" value="<?= e($s['phone'] ?? '') ?>"></div>
                <div class="col-md-6"><label class="form-label">Email</label>
                    <input type="email" name="email" class="form-control" value="<?= e($s['email'] ?? '') ?>"></div>
                <div class="col-12"><label class="form-label">Store Address</label>
                    <input name="address" class="form-control" value="<?= e($s['address'] ?? '') ?>"></div>
                <div class="col-md-6"><label class="form-label">Default Theme (Day / Night)</label>
                    <select name="default_theme" class="form-select">
                        <option value="light" <?= ($s['default_theme'] ?? '') === 'light' ? 'selected' : '' ?>>☀️ Day (Light)</option>
                        <option value="dark"  <?= ($s['default_theme'] ?? '') === 'dark'  ? 'selected' : '' ?>>🌙 Night (Dark)</option>
                    </select></div>
                <div class="col-md-6"><label class="form-label">Company Logo</label>
                    <input type="file" name="logo" class="form-control" accept="image/*">
                    <?php if (!empty($s['logo'])): ?><small class="text-muted">Current: <?= e($s['logo']) ?></small><?php endif; ?></div>
            </div></div>
        </div>

        <div class="tab-pane fade" id="tab-sales">
            <div class="card"><div class="card-body row g-3">
                <h3 class="section-title mb-0"><i class="fa-solid fa-percent"></i> Sales, Tax &amp; Loyalty</h3>
                <div class="col-md-3"><label class="form-label">Tax Rate (%)</label>
                    <input type="number" step="0.01" name="tax_rate" class="form-control" value="<?= e($s['tax_rate'] ?? 16) ?>"></div>
                <div class="col-md-3"><label class="form-label">Service Charge (%)</label>
                    <input type="number" step="0.01" name="service_charge" class="form-control" value="<?= e($s['service_charge'] ?? 0) ?>"></div>
                <div class="col-md-3"><label class="form-label">Loyalty: spend per point</label>
                    <input type="number" name="loyalty_rate" class="form-control" value="<?= e($s['loyalty_rate'] ?? 100) ?>"></div>
                <div class="col-md-3"><label class="form-label">Default Low-Stock Alert</label>
                    <input type="number" name="low_stock_default" class="form-control" value="<?= e($s['low_stock_default'] ?? 5) ?>"></div>
                <div class="col-md-4"><label class="form-label">Session Timeout (minutes)</label>
                    <input type="number" name="session_timeout" class="form-control" value="<?= e($s['session_timeout'] ?? 30) ?>"></div>
                <div class="col-12"><small class="text-muted">Service charge is added to every sale alongside tax. Loyalty: 1 point per <?= e($s['loyalty_rate'] ?? 100) ?> spent.</small></div>
            </div></div>
        </div>

        <div class="tab-pane fade" id="tab-receipt">
            <div class="card"><div class="card-body row g-3">
                <h3 class="section-title mb-0"><i class="fa-solid fa-receipt"></i> Receipt Settings</h3>
                <div class="col-md-6"><label class="form-label">Receipt Name / Header</label>
                    <input name="receipt_name" class="form-control" value="<?= e($s['receipt_name'] ?? '') ?>" placeholder="Defaults to company name"></div>
                <div class="col-md-3"><label class="form-label">Paper Width</label>
                    <select name="receipt_width" class="form-select">
                        <option value="80" <?= ($s['receipt_width'] ?? '80') === '80' ? 'selected' : '' ?>>80 mm</option>
                        <option value="58" <?= ($s['receipt_width'] ?? '80') === '58' ? 'selected' : '' ?>>58 mm</option>
                    </select></div>
                <div class="col-12"><label class="form-label">Header Note (e.g. VAT / TILL no.)</label>
                    <input name="receipt_header_note" class="form-control" value="<?= e($s['receipt_header_note'] ?? '') ?>"></div>
                <div class="col-12"><label class="form-label">Footer Message</label>
                    <input name="receipt_footer" class="form-control" value="<?= e($s['receipt_footer'] ?? '') ?>"></div>
                <div class="col-12"><label class="form-label d-block">Show on receipt</label>
                    <div class="d-flex flex-wrap gap-3">
                        <label class="toggle"><input type="checkbox" name="receipt_show_logo" <?= ($s['receipt_show_logo'] ?? 1) ? 'checked' : '' ?>> Logo / Title</label>
                        <label class="toggle"><input type="checkbox" name="receipt_show_tax" <?= ($s['receipt_show_tax'] ?? 1) ? 'checked' : '' ?>> Tax line</label>
                        <label class="toggle"><input type="checkbox" name="receipt_show_served" <?= ($s['receipt_show_served'] ?? 1) ? 'checked' : '' ?>> Served by (staff)</label>
                        <label class="toggle"><input type="checkbox" name="receipt_show_customer" <?= ($s['receipt_show_customer'] ?? 1) ? 'checked' : '' ?>> Customer</label>
                    </div></div>
            </div></div>
        </div>

        <div class="text-end mt-3" id="saveBar"><button class="btn btn-brand btn-lg"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button></div>
    </form>

    <!-- ============ Security tab (separate forms) ============ -->
    <div class="tab-pane fade" id="tab-security">
        <div class="row g-3">
            <div class="col-lg-6"><div class="card"><div class="card-body">
                <h3 class="section-title"><i class="fa-solid fa-key"></i> Change My Password</h3>
                <form method="post">
                    <?= csrf_field() ?><input type="hidden" name="action" value="change_password">
                    <label class="form-label">Current Password</label>
                    <input type="password" name="current_password" class="form-control mb-2" required>
                    <label class="form-label">New Password</label>
                    <input type="password" name="new_password" class="form-control mb-3" minlength="6" required>
                    <button class="btn btn-brand w-100">Update Password</button>
                </form>
            </div></div></div>

            <div class="col-lg-6"><div class="card"><div class="card-body">
                <h3 class="section-title"><i class="fa-solid fa-id-badge"></i> Manager Passcode (PIN)</h3>
                <p class="text-muted">Used for the keypad login and to authorise password resets on the login screen.</p>
                <form method="post">
                    <?= csrf_field() ?><input type="hidden" name="action" value="set_pin">
                    <label class="form-label">New Manager PIN <?= $hasPin ? '<span class="badge-soft badge-ok">PIN is set</span>' : '' ?></label>
                    <input name="manager_pin" class="form-control mb-3" inputmode="numeric" pattern="\d{4,8}" maxlength="8" placeholder="4–8 digits" required>
                    <button class="btn btn-brand w-100">Save PIN</button>
                </form>
            </div></div></div>

            <div class="col-12"><div class="card"><div class="card-body">
                <h3 class="section-title"><i class="fa-solid fa-users-gear"></i> Reset a User's Password</h3>
                <p class="text-muted mb-2">Staff who forget their password can be reset by a manager. Two ways:</p>
                <ul class="text-muted mb-0">
                    <li>From <a href="<?= BASE_URL ?>/users.php">User Management</a> → user menu → <strong>Reset Password</strong>.</li>
                    <li>On the <strong>login screen</strong> → <em>Forgot password?</em> → enter the user, a new password and the <strong>manager PIN</strong>.</li>
                </ul>
            </div></div></div>
        </div>
    </div>
</div>

<script>
// Keep the Save bar hidden on the Security tab (it has its own buttons)
const saveBar = document.getElementById('saveBar');
document.querySelectorAll('[data-bs-toggle="pill"]').forEach(t => t.addEventListener('shown.bs.tab', e => {
    saveBar.style.display = e.target.dataset.bsTarget === '#tab-security' ? 'none' : '';
}));
// Honour #hash so redirects land on the right tab (e.g. settings.php#security)
if (location.hash) {
    const btn = document.querySelector('[data-bs-target="#tab-' + location.hash.slice(1) + '"]');
    if (btn) new bootstrap.Tab(btn).show();
}
</script>
<?php require __DIR__ . '/includes/footer.php'; ?>
