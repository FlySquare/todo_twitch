<?php
include 'db/db.php';
$todosor=$db->prepare("SELECT * FROM todo_todo where todo_durum = 1");
$todosor->execute();
error_reporting(0);
if($_GET['tamam']){
  sleep(1);
  $silid = $_GET['tamam'];
  $query = $db->prepare("UPDATE todo_todo SET
todo_durum = :todo_durum
WHERE todo_id = $silid");
$update = $query->execute(array(
     "todo_durum" => 3

));
if ( $update ){
     header("Location: /");
}
}
if($_GET['sil']){
  sleep(1);
  $silid = $_GET['sil'];
  $query = $db->prepare("UPDATE todo_todo SET
todo_durum = :todo_durum
WHERE todo_id = $silid");
$update = $query->execute(array(
     "todo_durum" => 0

));
if ( $update ){
     header("Location: /");
}
}
 ?>

<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>BolFps.Com | Yayıncı Özel Todo App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
<link rel="stylesheet" href="assets/css/style.css">

</head>
<body>
<!-- partial:index.partial.html -->
<div class="app">
  <div class="header">
    <h1>KelHub - twitch.tv/kelhub</h1>
  </div>

  <input id="ipt-toggle-modal" type="checkbox"/>
  <div class="notification">Task edited successfully</div>
  <div class="tasks">
    <?php
                  while($todocek=$todosor->fetch(PDO::FETCH_ASSOC)){?>
    <div class="task" data-index="0">
      <div class="task-header">
        <div class="left-side">
          <ion-icon name="flame" data-priority="high"></ion-icon><span class="task-title"><?php echo $todocek['todo_sahip']; ?></span>
        </div>
        <div  class="right-side">

            <div onclick="completeTask(event, this)"  name="taskok" class="btn-complete-task" title="Complete task">

                <ion-icon onClick="parent.location='index.php?tamam=<?php echo $todocek['todo_id']; ?>'" name="checkmark"></ion-icon>

            </div>


          <div onclick="removeTask(event, this)" class="btn-remove-task" title="Remove task" >
            <ion-icon onClick="parent.location='index.php?sil=<?php echo $todocek['todo_id']; ?>'" name="trash"></ion-icon>
          </div>
        </div>
      </div>
      <div class="task-body"><span class="task-description"><?php echo $todocek['todo_icerik']; ?></span></div>
      <div class="task-footer"><span class="task-status">Görev Tamamlandı</span><span class="task-timestamp"><?php echo $todocek['todo_tarih']; ?></span></div>
    </div>

<?php } ?>

  </div>

</div>
<!-- partial -->
  <script src='https://unpkg.com/ionicons@4.5.5/dist/ionicons.js'></script>
<script src='https://momentjs.com/downloads/moment-with-locales.min.js'></script><script  src="assets/js/script.js"></script>

</body>
</html>
