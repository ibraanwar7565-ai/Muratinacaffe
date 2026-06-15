<?php require_once __DIR__ . '/includes/functions.php'; $set = settings(); ?>
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline · <?= e($set['company_name'] ?? 'Muratina Café') ?></title>
    <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/style.css">
    <style>
        body { min-height: 100vh; display: grid; place-items: center; background: #1c1209; color: #fff; text-align: center; padding: 2rem; }
        .off-logo { width: 86px; height: 86px; border-radius: 24px; display: grid; place-items: center; margin: 0 auto 1.25rem;
            font-size: 2.4rem; color: #fff; background: linear-gradient(135deg, #b5651d, #e09f3e); box-shadow: 0 12px 30px rgba(181,101,29,.5); }
        h1 { font-weight: 800; } p { color: rgba(255,255,255,.7); max-width: 380px; }
        button { margin-top: 1.25rem; border: none; border-radius: 12px; padding: .8rem 1.6rem; font-weight: 700;
            color: #fff; background: linear-gradient(135deg, #b5651d, #e09f3e); cursor: pointer; }
    </style>
</head>
<body>
    <div>
        <div class="off-logo">☕</div>
        <h1>You're offline</h1>
        <p>Muratina POS needs an internet/network connection to reach the server.
           Check your connection and try again.</p>
        <button onclick="location.reload()">Retry</button>
    </div>
</body>
</html>
