<?php
require_once __DIR__ . '/includes/auth.php';

if (is_logged_in()) {
    redirect('dashboard.php');
}

$error  = '';
$notice = '';
$loginMode = $_POST['login_mode'] ?? 'pin';   // 'pin' or 'staff'

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf'] ?? '')) {
        $error = 'Security token expired. Please try again.';
    } else {
        $do  = $_POST['do'] ?? 'login';
        $pin = $_POST['passcode'] ?? '';

        if ($do === 'login' && $loginMode === 'staff') {
            // Manager / Cashier — username + password
            if (attempt_login(trim($_POST['username'] ?? ''), $_POST['password'] ?? '')) {
                if (!empty($_POST['remember'])) {
                    setcookie(session_name(), session_id(), time() + 60 * 60 * 24 * 30, '/');
                }
                redirect('dashboard.php');
            }
            $error = 'Invalid username or password.';
        } elseif ($do === 'reset_password') {
            // Forgot password — a manager authorises the reset with their PIN
            $mgr = user_by_passcode($_POST['manager_pin'] ?? '');
            $target = trim($_POST['reset_username'] ?? '');
            $newPw  = $_POST['reset_password'] ?? '';
            if (!$mgr || $mgr['role'] !== 'manager') {
                $error = 'A valid manager passcode is required to reset a password.';
            } elseif (strlen($newPw) < 6) {
                $error = 'New password must be at least 6 characters.';
            } else {
                $stmt = db()->prepare('SELECT id, full_name FROM users WHERE username = ? LIMIT 1');
                $stmt->execute([$target]);
                $u = $stmt->fetch();
                if (!$u) {
                    $error = 'No user found with that username.';
                } else {
                    db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
                        ->execute([password_hash($newPw, PASSWORD_BCRYPT), $u['id']]);
                    $notice = 'Password reset for ' . $u['full_name'] . '. They can now sign in.';
                }
            }
        } elseif ($do === 'login') {
            // PIN login (waiters and any staff with a passcode)
            if (attempt_passcode_login($pin)) {
                redirect(user_role() === 'waiter' ? 'pos.php' : 'dashboard.php');
            }
            $error = 'PIN not recognised.';
        } else {
            // Attendance actions — Clock In / Out / Break (do not start a session)
            $map = ['clock_in' => 'in', 'clock_out' => 'out', 'break' => 'break'];
            $type = $map[$do] ?? null;
            $u = $type ? user_by_passcode($pin) : null;
            if ($u) {
                db()->prepare('INSERT INTO attendance (user_id, type) VALUES (?,?)')->execute([$u['id'], $type]);
                $labels = ['in' => 'clocked in', 'out' => 'clocked out', 'break' => 'on break'];
                $notice = $u['full_name'] . ' — ' . $labels[$type] . ' at ' . date('H:i');
            } else {
                $error = 'Enter your PIN, then tap Clock In / Out / Break.';
            }
        }
    }
}

$timeout = isset($_GET['timeout']);
$set = settings();
?>
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login · <?= e($set['company_name'] ?? 'Muratina Café') ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/style.css">
</head>
<body>
<div class="login-wrap">
    <!-- Login background video (contributed: assets/videos/vid1.mp4).
         Poster image shows while the video loads or if it is unavailable. -->
    <div class="login-bg" id="loginBg">
        <video class="bg-video" muted loop autoplay playsinline preload="auto"
               poster="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80">
            <source src="<?= BASE_URL ?>/assets/videos/vid1.mp4" type="video/mp4">
        </video>
        <div class="bg-fallback slide-1"></div>
    </div>
    <div class="login-overlay"></div>
    <div class="bg-caption show"><i class="fa-solid fa-mug-hot"></i> <span><?= e($set['company_name'] ?? 'Muratina Café') ?> — freshly brewed, freshly served</span></div>

    <!-- POS terminal panel (YUMAPOS-style) -->
    <form method="post" class="pos-terminal" id="posForm" autocomplete="off">
        <?= csrf_field() ?>
        <input type="hidden" name="login_mode" id="loginMode" value="pin">
        <input type="hidden" name="passcode" id="passcode">

        <!-- Left: keypad / staff password -->
        <div class="pt-left">
            <div id="pinPanel">
                <div class="pin-screen" id="pinScreen" aria-live="polite"></div>
                <div class="keypad">
                    <?php foreach ([1,2,3,4,5,6,7,8,9] as $n): ?>
                        <button type="button" class="key" data-key="<?= $n ?>"><?= $n ?></button>
                    <?php endforeach; ?>
                    <button type="button" class="key key-soft" data-key="back" aria-label="Backspace"><i class="fa-solid fa-arrow-left-long"></i></button>
                    <button type="button" class="key" data-key="0">0</button>
                    <button type="button" class="key key-soft" data-key="clear" aria-label="Clear">&times;</button>
                </div>
            </div>

            <div id="staffPanel" class="d-none">
                <div class="staff-fields">
                    <div class="input-icon mb-2"><i class="fa-solid fa-user"></i>
                        <input type="text" name="username" class="form-control form-control-lg" placeholder="Username" value="<?= old('username') ?>"></div>
                    <div class="input-icon mb-2"><i class="fa-solid fa-lock"></i>
                        <input type="password" name="password" class="form-control form-control-lg" placeholder="Password"></div>
                    <label class="remember"><input type="checkbox" name="remember"> Remember me</label>
                </div>
            </div>

            <div id="resetPanel" class="d-none">
                <div class="staff-fields">
                    <h6 style="color:#fff;font-weight:700">Reset a forgotten password</h6>
                    <div class="input-icon mb-2"><i class="fa-solid fa-user"></i>
                        <input type="text" name="reset_username" class="form-control" placeholder="Username to reset"></div>
                    <div class="input-icon mb-2"><i class="fa-solid fa-lock"></i>
                        <input type="password" name="reset_password" class="form-control" placeholder="New password"></div>
                    <div class="input-icon mb-2"><i class="fa-solid fa-id-badge"></i>
                        <input type="text" name="manager_pin" class="form-control" inputmode="numeric" placeholder="Manager PIN"></div>
                    <button type="submit" name="do" value="reset_password" class="pos-btn primary w-100"><i class="fa-solid fa-rotate"></i> Reset Password</button>
                    <a href="#" class="pt-toggle d-block mt-2" id="cancelReset">Cancel</a>
                </div>
            </div>
        </div>

        <!-- Right: brand + action buttons -->
        <div class="pt-right">
            <div class="pt-brand">
                <span class="pt-logo"><i class="fa-solid fa-mug-hot"></i></span>
                <span class="pt-name"><?= e($set['company_name'] ?? 'Muratina Café') ?><small>Point of Sale</small></span>
            </div>

            <?php if ($timeout): ?><div class="pt-alert warn"><i class="fa-solid fa-clock"></i> Session expired. Sign in again.</div><?php endif; ?>
            <?php if ($error): ?><div class="pt-alert err"><i class="fa-solid fa-circle-exclamation"></i> <?= e($error) ?></div><?php endif; ?>
            <?php if ($notice): ?><div class="pt-alert ok"><i class="fa-solid fa-circle-check"></i> <?= e($notice) ?></div><?php endif; ?>

            <button type="submit" name="do" value="login" class="pos-btn primary" id="loginBtn"><i class="fa-solid fa-right-to-bracket"></i> LOGIN</button>
            <button type="submit" name="do" value="clock_in" class="pos-btn"><i class="fa-solid fa-business-time"></i> CLOCK IN</button>
            <button type="submit" name="do" value="clock_out" class="pos-btn"><i class="fa-solid fa-door-open"></i> CLOCK OUT</button>
            <button type="submit" name="do" value="break" class="pos-btn"><i class="fa-solid fa-mug-saucer"></i> BREAK</button>

            <a href="#" class="pt-toggle" id="toggleMode"><i class="fa-solid fa-user-tie"></i> <span>Manager / Cashier password login</span></a>
            <a href="#" class="pt-toggle" id="forgotLink"><i class="fa-solid fa-circle-question"></i> Forgot password?</a>
            <div class="pt-demo">Waiter PINs <code>1234</code> · <code>5678</code> — Manager PIN <code>194825</code> — Staff <code>admin</code> / <code>Pass@123</code></div>
        </div>
    </form>
</div>

<script>
// ---- Keypad ----
(function () {
    let pin = '';
    const screen = document.getElementById('pinScreen');
    const field = document.getElementById('passcode');
    function refresh() { screen.textContent = '*'.repeat(pin.length); field.value = pin; }
    document.querySelectorAll('.key[data-key]').forEach(k => k.addEventListener('click', () => {
        const v = k.dataset.key;
        if (v === 'back') pin = pin.slice(0, -1);
        else if (v === 'clear') pin = '';
        else if (pin.length < 8) pin += v;
        refresh();
    }));
    document.addEventListener('keydown', e => {
        if (!document.getElementById('staffPanel').classList.contains('d-none')) return; // ignore in staff mode
        if (/^[0-9]$/.test(e.key) && pin.length < 8) { pin += e.key; refresh(); }
        else if (e.key === 'Backspace') { pin = pin.slice(0, -1); refresh(); }
    });
    refresh();
})();

// ---- Panel switching: PIN / Staff password / Reset ----
const pinP = document.getElementById('pinPanel');
const staffP = document.getElementById('staffPanel');
const resetP = document.getElementById('resetPanel');
const actionBtns = document.querySelectorAll('.pt-right .pos-btn'); // LOGIN + clock buttons
const toggleModeLink = document.getElementById('toggleMode');

function showPanel(which) {
    pinP.classList.toggle('d-none', which !== 'pin');
    staffP.classList.toggle('d-none', which !== 'staff');
    resetP.classList.toggle('d-none', which !== 'reset');
    document.getElementById('loginMode').value = which === 'staff' ? 'staff' : 'pin';
    // The right-side buttons are for login/attendance; hide them while resetting.
    actionBtns.forEach(b => {
        const clock = !b.classList.contains('primary');
        b.style.display = which === 'reset' ? 'none' : (which === 'staff' && clock ? 'none' : '');
    });
    toggleModeLink.querySelector('span').textContent =
        which === 'staff' ? 'Use waiter PIN keypad' : 'Manager / Cashier password login';
}
toggleModeLink.addEventListener('click', e => { e.preventDefault(); showPanel(staffP.classList.contains('d-none') ? 'staff' : 'pin'); });
document.getElementById('forgotLink').addEventListener('click', e => { e.preventDefault(); showPanel('reset'); });
document.getElementById('cancelReset').addEventListener('click', e => { e.preventDefault(); showPanel('pin'); });
<?php if ($loginMode === 'staff'): ?>showPanel('staff');<?php endif; ?>
</script>
</body>
</html>
