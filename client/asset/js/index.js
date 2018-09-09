var base_url = 'http://localhost:3000'
var token = localStorage.getItem('token')
if (!token) {
    window.location = 'login.html'
}

function logout() {
    localStorage.removeItem('token')
    window.location = 'login.html'
}

// ============ todaytask ===================
$.ajax({
    method: 'GET',
    url: base_url + '/tasks/todaytask',
    headers: {
        token: token
    }
})
    .done(result => {
        if (result.dataTodayTask.length < 1) {
            $('.tasks').append(`
                    <h3 class="card-today">You Dont Have any task today</h3>
                `)
        } else {
            $('.card-today').hide()
            let tasks = result.dataTodayTask
            let complete = []
            let uncomplete = []
            tasks.forEach(task => {
                if (task.status == true) {
                    complete.push(task)
                } else {
                    uncomplete.push(task)
                }
            });

            uncomplete.forEach(un => {
                $('.tasks').append(`
                        <div class="card bg-light mb-3 card-today" style="max-width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${un.task}</h5><hr>
                                <p class="card-text">${un.description}</p>
                            </div>
                            <div class="card-footer bg-transparent border-light">
                                    <button type="button" class="btn btn-success btn-sm" onclick="modalToUpdate('${un._id}', '${un.task}', '${un.description}', '${un.d_day}', '${un.reminder}')" data-toggle="modal" data-target="#updateTask">
                                    <i class="fas fa-edit"></i>
                                    </button>
                                <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${un._id}')">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button type="button" class="btn btn-primary btn-sm" onclick="taskDone('${un._id}')">
                                    <i class="fas fa-check-circle"></i>
                                </button>
                            </div>
                        </div>
                             `)
            });

            complete.forEach(comp => {
                $('.tasks').append(`
                <div class="card bg-light mb-3 card-today" style="max-width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${comp.task}</h5><hr>
                    <p class="card-text">${comp.description}</p>
                </div>
                <div class="card-footer bg-transparent border-light">
                    <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${comp._id}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button type="button" class="btn btn-primary btn-sm">
                        <i class="far fa-star"></i>
                    </button>
                </div>
            </div>
                `)
            });
        }

    })
    .fail(err => {
        console.log(err);

    })
// ===========================================

// ============= get today task ==============
function getTodayTask() {
    $.ajax({
        method: 'GET',
        url: base_url + '/tasks/todaytask',
        headers: {
            token: token
        }
    })
        .done(result => {
            if (result.dataTodayTask.length < 1) {
                $('.card-today').hide()
                $('.tasks').append(`
                    <h3 class="card-today">You Dont Have any task today</h3>
                `)
            } else {
                $('.card-today').hide()
                let tasks = result.dataTodayTask
                let complete = []
                let uncomplete = []
                tasks.forEach(task => {
                    if (task.status == true) {
                        complete.push(task)
                    } else {
                        uncomplete.push(task)
                    }
                });

                uncomplete.forEach(un => {
                    $('.tasks').append(`
                            <div class="card bg-light mb-3 card-today" style="max-width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${un.task}</h5><hr>
                                    <p class="card-text">${un.description}</p>
                                </div>
                                <div class="card-footer bg-transparent border-light">
                                        <button type="button" class="btn btn-success btn-sm" onclick="modalToUpdate('${un._id}', '${un.task}', '${un.description}', '${un.d_day}', '${un.reminder}')" data-toggle="modal" data-target="#updateTask">
                                        <i class="fas fa-edit"></i>
                                        </button>
                                    <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${un._id}')">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm" onclick="taskDone('${un._id}')">
                                        <i class="fas fa-check-circle"></i>
                                    </button>
                                </div>
                            </div>
                                 `)
                });
    
                complete.forEach(comp => {
                    $('.tasks').append(`
                    <div class="card bg-light mb-3 card-today" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${comp.task}</h5><hr>
                        <p class="card-text">${comp.description}</p>
                    </div>
                    <div class="card-footer bg-transparent border-light">
                        <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${comp._id}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button type="button" class="btn btn-primary btn-sm">
                            <i class="far fa-star"></i>
                        </button>
                    </div>
                </div>
                    `)
                });

                // uncomplete.forEach(un => {
                //     $('.tasks').append(`
                //             <div class="card border-success mb-3 card-today" style="max-width: 18rem;">

                //                 <div class="card-body text-success">
                //                     <h5 class="card-title"> ${un.task}</h5><hr>
                //                     <p class="card-text"> ${un.description} </p>

                //                 </div>
                //                 <div class="card-footer bg-transparent border-success">
                //                     <button type="button" class="btn btn-success btn-sm" onclick="modalToUpdate('${un._id}', '${un.task}', '${un.description}', '${un.d_day}', '${un.reminder}')" data-toggle="modal" data-target="#updateTask">
                //                       <i class="fas fa-edit"></i>
                //                       </button>
                //                     <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${un._id}')">
                //                         <i class="fas fa-trash-alt"></i>
                //                     </button>
                //                     <button type="button" class="btn btn-primary btn-sm" onclick="taskDone('${un._id}')">
                //                         <i class="fas fa-check-circle"></i>
                //                     </button>
                //                 </div>
                //             </div> 
                //              `)
                // });

                // complete.forEach(comp => {

                //     $('.tasks').append(`
                //             <div class="card border-success mb-3 card-today" style="max-width: 18rem;">

                //                 <div class="card-body text-success">
                //                     <h5 class="card-title"> ${comp.task}</h5> <hr>
                //                     <p class="card-text"> ${comp.description} </p>

                //                 </div>
                //                 <div class="card-footer bg-transparent border-success">
                //                     <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${comp._id}')">
                //                         <i class="fas fa-trash-alt"></i>
                //                     </button>
                //                     <button type="button" class="btn btn-primary btn-sm" disabled onclick="taskDone('${comp._id}')">
                //                             <i class="far fa-star"></i>
                //                     </button>
                //                 </div>
                //             </div> 
                //              `)
                // });
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
    }else if(duedate < reminder){
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Reminder dates may not exceed the due date'
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
                getTodayTask()
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
            getTodayTask()
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
                    getTodayTask()
                })
                .fail(err => {
                    console.log(err);

                })
           
        }
    })

}
// ===============================================

//done task
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
            getTodayTask()
        })
        .fail(err => {
            console.log(err);

        })
}

//weather

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

$.ajax({
    method: 'GET',
    url: `${base_url}/tasks/reminder`,
    headers: {
        token: token
    }
})
.done(result => {
    console.log(result);
    
})
.fail(err => {
    console.log(err);
    
})

