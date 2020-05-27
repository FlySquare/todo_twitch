<?php
include 'db/db.php';
$todosor=$db->prepare("SELECT * FROM todo_todo where todo_durum = 1");
$todosor->execute();
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
        <div class="right-side">

          <div class="btn-complete-task" title="Complete task" onclick="completeTask(event, this)">
            <ion-icon name="checkmark"></ion-icon>
          </div>
          <div class="btn-remove-task" title="Remove task" onclick="removeTask(event, this)">
            <ion-icon name="trash"></ion-icon>
          </div>
        </div>
      </div>
      <div class="task-body"><span class="task-description"><?php echo $todocek['todo_icerik']; ?></span></div>
      <div class="task-footer"><span class="task-status">Görev Tamamlandı</span><span class="task-timestamp"><?php echo $todocek['todo_tarih']; ?></span></div>
    </div>

<?php } ?>

  </div>
  <div class="overlay">
    <p>Add task</p><span>Fill at least the title of the task, description is not required 😁</span>
    <form class="modal">
      <label for="task-title">Title</label>
      <input id="task-title" type="text"/>
      <label for="task-desc">Description</label>
      <textarea id="task-desc" rows="3"></textarea><span>Priority</span>
      <div class="priority">
        <input id="high" type="radio" name="priority" value="high"/>
        <label for="high">High</label>
        <input id="medium" type="radio" name="priority" value="medium" checked="checked"/>
        <label for="medium">Medium</label>
        <input id="low" type="radio" name="priority" value="low"/>
        <label for="low">Low</label>
      </div>
      <div class="modal-btns">
        <button class="btn-add-task">Add</button>
        <div class="btn-cancel-task">Cancel</div>
      </div>
    </form>
  </div>
</div>
<!-- partial -->
  <script src='https://unpkg.com/ionicons@4.5.5/dist/ionicons.js'></script>
<script src='https://momentjs.com/downloads/moment-with-locales.min.js'></script><script  src="assets/js/script.js"></script>

</body>
</html>
