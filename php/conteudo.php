<?php if(isset($_GET["menu"])): ?>
	<?php require($_GET["menu"].".php"); ?>
	<?php else: require("home.php"); ?>
<?php endif ?>