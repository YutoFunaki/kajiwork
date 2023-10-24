<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php echo \Asset::css('header.css'); ?>
  <?php echo \Asset::css('templete.css');?>
  <title>Document</title>
</head>
<body>
<div class="header">
      <div class="HeaderList">
        <button class="HeaderListButton">
          <ListIcon class="ListIcon" />
        </button>


      </div>
      <p class="AppTitle">
        <a href="/home">KajiWork</a>
      </p>
      <div class="AccountCircleIconBackground">
        <a href="/mypage">
          <AccountCircleIcon class="AccountCircleIcon" />
        </a>
      </div>
    </div>
</body>
</html>