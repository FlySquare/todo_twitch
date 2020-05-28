const modal = document.querySelector('.modal');
const btnAddTask = document.querySelector('.btn-add-task');
const btnCancelTask = document.querySelector('.btn-cancel-task');
const iptToggleModal = document.querySelector('#ipt-toggle-modal');
let isEditing = false;
let editingTaskIndex = '';

btnCancelTask.addEventListener('click', () => {
  iptToggleModal.checked = false;
  modal.reset();
  document.querySelectorAll('.task').forEach(task => {
    task.classList.remove('swipe-right');
  });
});

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape' && iptToggleModal.checked) {
    iptToggleModal.checked = false;
    modal.reset();
    document.querySelectorAll('.task').forEach(task => {
      task.classList.remove('swipe-right');
    });
  }

  if (evt.key === '+' && !iptToggleModal.checked) {
    document.querySelector('.overlay > p').innerText = 'Add task';
    document.querySelector('.btn-add-task').innerText = 'Add';

    iptToggleModal.checked = true;
    document.querySelectorAll('.task').forEach(task => {
      task.classList.add('swipe-right');
    });

    setTimeout(() => {
      document.querySelector('#task-title').focus();
    }, 500);
  }
});

iptToggleModal.addEventListener('change', function () {
  if (this.checked) {
    document.querySelector('.overlay > p').innerText = 'Add task';
    document.querySelector('.btn-add-task').innerText = 'Add';

    document.querySelectorAll('.task').forEach((task, index) => {
      task.classList.add('swipe-right');
      task.style.transitionDelay = index * .02 + 's';
    });
    document.querySelector('#task-title').focus();
  } else
  {
    modal.reset();
    document.querySelectorAll('.task').forEach(task => {
      task.classList.remove('swipe-right');
    });
  }
});

btnAddTask.addEventListener('click', function (evt) {
  if (isEditing) {
    evt.preventDefault();

    let taskToEdit;
    let newTitle = document.querySelector('#task-title').value.trim();
    let newDesc = document.querySelector('#task-desc').value.trim();
    let newTimestamp = moment().format('DD/MM/YYYY');
    let newPriority;

    document.querySelectorAll('.task').forEach((item, index) => {
      if (index === parseInt(editingTaskIndex)) {
        taskToEdit = item;
      }
    });

    document.querySelectorAll('input[name="priority"]').forEach(item => {
      if (item.checked)
      newPriority = item.value;
    });

    if (newTitle.length > 0 && newTitle !== '' && newTitle.replace(/\s/g, '') !== '') {
      taskToEdit.querySelector('.task-title').innerText = newTitle;

      if (taskToEdit.querySelector('.task-description') !== null && taskToEdit.querySelector('.task-description') !== undefined) {
        if (newDesc.length > 0 && newDesc !== '' && newDesc.replace(/\s/g, '') !== '') {
          taskToEdit.querySelector('.task-description').innerText = newDesc;
        } else
        {
          taskToEdit.querySelector('.task-body').parentElement.removeChild(taskToEdit.querySelector('.task-body'));
        }
      } else
      {
        if (newDesc.length > 0 && newDesc !== '' && newDesc.replace(/\s/g, '') !== '') {
          const taskBody = document.createElement('div');
          taskBody.classList.add('task-body');
          const taskDesc = document.createElement('span');
          taskDesc.classList.add('task-description');
          taskDesc.innerText = newDesc;
          taskBody.appendChild(taskDesc);

          taskToEdit.querySelector('.task-footer').before(taskBody);
        }
      }

      switch (newPriority) {
        case 'high':
          taskToEdit.querySelector('ion-icon[aria-label="flame"]').style.color = '#F45366';
          taskToEdit.querySelector('ion-icon[aria-label="flame"]').dataset.priority = 'high';
          break;
        case 'medium':
          taskToEdit.querySelector('ion-icon[aria-label="flame"]').style.color = '#627DFE';
          taskToEdit.querySelector('ion-icon[aria-label="flame"]').dataset.priority = 'medium';
          break;
        case 'low':
          taskToEdit.querySelector('ion-icon[aria-label="flame"]').style.color = '#aaa';
          taskToEdit.querySelector('ion-icon[aria-label="flame"]').dataset.priority = 'low';
          break;
        default:
          console.log('default color applied to icon');
          break;}


      taskToEdit.querySelector('.task-timestamp').innerText = newTimestamp;

      iptToggleModal.checked = false;
      modal.reset();

      document.querySelectorAll('.task').forEach(item => {
        item.classList.remove('swipe-right');
      });

      document.querySelector('.notification').classList.add('-is-shown');

      setTimeout(() => {
        document.querySelector('.notification').classList.remove('-is-shown');
      }, 1000);

      isEditing = false;
      count = 0;
      editingTaskIndex = '';
    } else
    {
      document.querySelector('.overlay > span').classList.add('-w-animation');
      document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😵';
      document.querySelector('.overlay > span').addEventListener('animationend', () => {
        document.querySelector('.overlay > span').classList.remove('-w-animation');
        document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😁';
      });
    }
  } else
  {
    evt.preventDefault();

    let title = document.querySelector('#task-title').value.trim();
    let desc = document.querySelector('#task-desc').value.trim();
    let timestamp = moment().format('DD/MM/YYYY');
    let priority;

    document.querySelectorAll('input[name="priority"]').forEach(item => {
      if (item.checked)
      priority = item.value;
    });

    document.querySelectorAll('.task').forEach(item => {
      item.dataset.index = item.dataset.index + 1;
    });

    if (title.length > 0 && title !== '' && title.replace(/\s/g, '') !== '') {
      const task = document.createElement('div');
      task.classList.add('task', 'swipe-right');
      task.dataset.index = 0;

      const taskHeader = document.createElement('div');
      taskHeader.classList.add('task-header');

      const leftSide = document.createElement('div');
      leftSide.classList.add('left-side');

      const icon = document.createElement('ion-icon');
      icon.name = 'flame';
      switch (priority) {
        case 'high':
          icon.style.color = '#F45366';
          icon.dataset.priority = 'high';
          break;
        case 'medium':
          icon.style.color = '#627DFE';
          icon.dataset.priority = 'medium';
          break;
        case 'low':
          icon.style.color = '#aaa';
          icon.dataset.priority = 'low';
          break;
        default:
          console.log('default color applied to icon');
          break;}


      const taskTitle = document.createElement('span');
      taskTitle.classList.add('task-title');
      taskTitle.innerText = title;

      leftSide.appendChild(icon);
      leftSide.appendChild(taskTitle);

      const rightSide = document.createElement('div');
      rightSide.classList.add('right-side');

      const btnEditTask = document.createElement('div');
      btnEditTask.classList.add('btn-edit-task');
      btnEditTask.title = 'Edit task';
      btnEditTask.addEventListener('click', editTask);
      const editIcon = document.createElement('ion-icon');
      editIcon.name = 'create';
      btnEditTask.appendChild(editIcon);

      const btnCompleteTask = document.createElement('div');
      btnCompleteTask.classList.add('btn-complete-task');
      btnCompleteTask.title = 'Complete task';
      btnCompleteTask.addEventListener('click', completeTask);
      const completeIcon = document.createElement('ion-icon');
      completeIcon.name = 'checkmark';
      btnCompleteTask.appendChild(completeIcon);

      const btnRemoveTask = document.createElement('div');
      btnRemoveTask.classList.add('btn-remove-task');
      btnRemoveTask.title = 'Remove task';
      btnRemoveTask.addEventListener('click', removeTask);
      const removeIcon = document.createElement('ion-icon');
      removeIcon.name = 'trash';
      btnRemoveTask.appendChild(removeIcon);

      rightSide.appendChild(btnEditTask);
      rightSide.appendChild(btnCompleteTask);
      rightSide.appendChild(btnRemoveTask);

      taskHeader.appendChild(leftSide);
      taskHeader.appendChild(rightSide);

      const taskBody = document.createElement('div');
      taskBody.classList.add('task-body');

      if (desc.length > 0 && desc !== '' && desc.replace(/\s/g, '') !== '') {
        const taskDesc = document.createElement('span');
        taskDesc.classList.add('task-description');
        taskDesc.innerText = desc;

        taskBody.appendChild(taskDesc);

        task.appendChild(taskHeader);
        task.appendChild(taskBody);
      } else {
        task.appendChild(taskHeader);
      }

      const taskFooter = document.createElement('div');
      taskFooter.classList.add('task-footer');

      const taskStatus = document.createElement('span');
      taskStatus.classList.add('task-status');
      taskStatus.innerText = 'Task completed';

      const taskTimestamp = document.createElement('div');
      taskTimestamp.classList.add('task-timestamp');
      taskTimestamp.innerText = timestamp;

      taskFooter.appendChild(taskStatus);
      taskFooter.appendChild(taskTimestamp);

      task.appendChild(taskFooter);

      let firstTask;

      if (document.querySelector('.tasks').children.length > 0) {
        firstTask = document.querySelector('.task');
      }

      if (firstTask !== undefined) {
        firstTask.before(task);
      } else
      {
        document.querySelector('.tasks').appendChild(task);
      }

      iptToggleModal.checked = false;
      modal.reset();

      document.querySelectorAll('.task').forEach((item, index) => {
        if (item !== task) {
          item.classList.remove('swipe-right');
        } else {
          item.style.transitionDelay = index * .02 + 's';
          setTimeout(() => {
            item.classList.remove('swipe-right');
          }, index * .1);
        }
      });

      isEditing = false;
      count = 0;
      editingTaskIndex = '';
    } else
    {
      document.querySelector('.overlay > span').classList.add('-w-animation');
      document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😵';
      document.querySelector('.overlay > span').addEventListener('animationend', () => {
        document.querySelector('.overlay > span').classList.remove('-w-animation');
        document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😁';
      });
    }
  }
});

function editTask(evt, el) {
  const btn = el == undefined ? this : el;
  const task = btn.parentNode.parentNode.parentNode;
  let title = task.querySelector('.task-title').innerText;
  let desc = '';
  editingTaskIndex = task.dataset.index;

  if (task.querySelector('.task-description') !== null && task.querySelector('.task-description') !== undefined) {
    desc = task.querySelector('.task-description').innerText;
  }

  let priority = task.querySelector('ion-icon[aria-label="flame"]').dataset.priority;

  document.querySelector('.overlay > p').innerText = 'Edit task';
  document.querySelector('.btn-add-task').innerText = 'Save';

  document.querySelector('#task-title').value = title;
  document.querySelector('#task-title').focus();
  document.querySelector('#task-desc').value = desc;

  document.querySelectorAll('input[name="priority"]').forEach(item => {
    if (item.value == priority) {
      item.checked = true;
    }
  });

  iptToggleModal.checked = true;
  document.querySelectorAll('.task').forEach(item => {
    item.classList.add('swipe-right');
  });

  isEditing = true;
}

function completeTask(evt, el) {
  const btn = el == undefined ? this : el;
  const task = btn.parentNode.parentNode.parentNode;

  task.classList.toggle('-is-completed');
}

function removeTask(evt, el) {
  const btn = el == undefined ? this : el;
  const task = btn.parentNode.parentNode.parentNode;
  let taskStatus = task.querySelector('.task-status');

  taskStatus.innerText = 'Görev Silindi';

  task.classList.add('-is-removed');

  setTimeout(() => {
    task.classList.add('swipe-right');
  }, 500);

  setTimeout(() => {
    task.parentElement.removeChild(task);
  }, 1000);
}
