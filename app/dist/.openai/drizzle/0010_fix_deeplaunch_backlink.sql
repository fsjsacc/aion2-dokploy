UPDATE `external_links`
SET `href` = 'https://deeplaunch.io/'
WHERE `href` LIKE 'https://%.ngrok-free.app/%'
  AND `image_src` LIKE 'https://deeplaunch.io/%';
