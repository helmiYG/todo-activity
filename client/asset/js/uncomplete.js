var base_url = 'http://localhost:3000'
var token = localStorage.getItem('token')
if (!token) {
    window.location = 'login.html'
}

function logout() {
    localStorage.removeItem('token')
    window.location = 'login.html'
}

// ============ all tasks ===================
$.ajax({
    method: 'GET',
    url: base_url + '/tasks',
    headers: {
        token: token
    }
})
    .done(result => {
        if (result.tasks.length < 1) {
            $('.tasks').append(`
                <h3 class="card-today">You Dont Have any tasks</h3>
        `)
        } else {
            result.tasks.forEach(function (task, index) {
                let new_d_day = convertDate(task.d_day)
                let new_reminder = convertDate(task.reminder)
                $('.b-table').append(`
                            <tr class="hide-tr">
                                <th scope="row">${index + 1}</th>
                                <td>${task.task}</td>
                                <td>${task.description}</td>
                                <td>${new_d_day}</td>
                                <td>${new_reminder}</td>
                                <td>
                                        <button type="button" class="btn btn-success btn-sm" onclick="modalToUpdate('${task._id}', '${task.task}', '${task.description}', '${task.d_day}', '${task.reminder}')" data-toggle="modal" data-target="#updateTask">
                                             <i class="fas fa-edit"></i>
                                        </button>  
                                        <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${task._id}')">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm" onclick="taskDone('${task._id}')">
                                            <i class="fas fa-check-circle"></i>
                                        </button>
                                </td>
                            </tr>
                `)
            });

        }
    })
    .fail(err => {
        console.log(err);

    })

// ===========================================


// ============= get all tasks ==============
function getAllTasks() {
    $.ajax({
        method: 'GET',
        url: base_url + '/tasks',
        headers: {
            token: token
        }
    })
        .done(result => {
            if (result.tasks.length < 1) {
                $('.hide-tr').hide()
                $('.tasks').append(`
                    <h3 class="card-today">You Dont Have any tasks</h3>
        `)
            } else {
                $('.card-today').hide()
                $('.hide-tr').hide()
                result.tasks.forEach(function (task, index) {
                    let new_d_day = convertDate(task.d_day)
                    let new_reminder = convertDate(task.reminder)

                    $('.b-table').append(`
                            <tr class="hide-tr">
                                <th scope="row">${index + 1}</th>
                                <td>${task.task}</td>
                                <td>${task.description}</td>
                                <td>${new_d_day}</td>
                                <td>${new_reminder}</td>
                                <td>
                                        <button type="button" class="btn btn-success btn-sm" onclick="modalToUpdate('${task._id}', '${task.task}', '${task.description}', '${task.d_day}', '${task.reminder}')" data-toggle="modal" data-target="#updateTask">
                                             <i class="fas fa-edit"></i>
                                        </button>  
                                        <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${task._id}')">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm" onclick="taskDone('${task._id}')">
                                            <i class="fas fa-check-circle"></i>
                                        </button>
                                </td>
                            </tr>
                `)
                });

            }
        })
        .fail(err => {
            console.log(err);

        })
}
//=============================================

// ============== add task ===================
function add() {
    let taskName = $('#taskname').val()
    let description = $('#description').val()
    let duedate = $('#duedate').val()
    let reminder = $('#reminder').val()
    if(!taskName || !description || !duedate || !reminder){
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'all form must be filled!'
          })
    }else{
        $('#taskname').val("")
        $('#description').val("")
        $('#duedate').val("")
        $('#reminder').val("")
        $.ajax({
            method: 'POST',
            url: base_url + '/tasks',
            headers: {
                token: token
            },
            data: {
                task: taskName,
                description: description,
                d_day: duedate,
                reminder: reminder
            }
        })
            .done(result => {
                swal({
                    position: 'top',
                    type: 'success',
                    title: 'Your task has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                getAllTasks()
            })
            .fail(err => {
                console.log(err);

            })

    }
}
//=============================================

//=================convert date===================
function convertDate(date) {
    let day = date.slice(8, 10);
    let month = date.slice(6, 7);
    let year = date.slice(0, 4);
    if (month > 9) {
        month = `1${month}`;
    } else {
        month = `0${month}`
    }
    return year + "-" + month + "-" + day
}
// ============================================

// =============== modalto updtae ===================
function modalToUpdate(idtask, task, desc, d_day, reminder) {
    let new_d_day = convertDate(d_day)
    let new_reminder = convertDate(reminder)
    $('.form-update').hide()
    $('.modal-update').append(`
            <div class="form-update">
            <form>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Task Name:</label>
                            <input type="text" class="form-control" id="tasknameU" value="${task}">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <textarea class="form-control" id="descriptionU">${desc}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Due Date:</label>
                            <input type="date" id="duedateU" class="form-control" value="${new_d_day}">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Reminder:
                                <span style="color: gray; text-align: right">optional</span>
                            </label>
                            <input type="date" id="reminderU" class="form-control" value="${new_reminder}">
                        </div>
                    </form>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="update('${idtask}')">Submit</button>

                </div>
            </div>
            `)

}
// =============================================


// ================== update task ==============
function update(idtask) {
    let task = $('#tasknameU').val()
    let desc = $('#descriptionU').val()
    let duedate = $('#duedateU').val()
    let reminder = $('#reminderU').val()
    $.ajax({
        method: 'PUT',
        url: `${base_url}/tasks/${idtask}`,
        headers: {
            token: token
        },
        data: {
            task: task,
            description: desc,
            d_day: duedate,
            reminder: reminder
        },

    })
        .done(() => {
            swal({
                position: 'top',
                type: 'success',
                title: 'Your task has been updated',
                showConfirmButton: false,
                timer: 1500
            })
            getAllTasks()
        })
        .fail(err => {
            console.log(err);

        })
}
// ===============================================

// ================== delete task ==============
function taskToDelete(idtask) {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                method: 'DELETE',
                url: `${base_url}/tasks/${idtask}`,
                headers: {
                    token: token
                }
            })
                .done(() => {
                    swal({
                        position: 'top',
                        type: 'success',
                        title: 'Your task has been deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    getAllTasks()
                })
                .fail(err => {
                    console.log(err);

                })
           
        }
    })
}
// ===============================================

function taskDone(idtask) {
    $.ajax({
        method: 'PUT',
        url: `${base_url}/tasks/${idtask}/complete`,
        headers: {
            token: token
        }
    })
        .done(() => {
            swal({
                position: 'top',
                type: 'success',
                title: 'Yeay, you have completed your task',
                showConfirmButton: false,
                timer: 1500
            })
            getAllTasks()
        })
        .fail(err => {
            console.log(err);

        })
}


$.ajax({
    method: 'GET',
    url: `${base_url}/weathers`,
    headers: {
        token: token
    }
})
.done(result => {
    $('.card-weather').append(`
            <div class="card-header"><i class="fas fa-map-marker-alt"></i> ${result.loc}</div>
            <div class="card-body">
            <h5 class="card-title" style="font-size:60px">${result.temp}<span style="font-size:50px">&#x2103 </span></h5>
            <p class="card-text"><i class="fas fa-cloud"></i> ${result.desc}</p>
            </div>
    `)
})
.fail(err => {
    console.log(err);
    
})