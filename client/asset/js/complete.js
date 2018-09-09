
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
    url: base_url + '/tasks/complete',
    headers: {
        token: token
    }
})
    .done(result => {
        if (result.tasks.length < 1) {
            $('.tasks').append(`
                <h3 class="card-today">You Dont Have any task</h3>
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
                                        <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${task._id}')">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm" disabled)">
                                                <i class="far fa-star"></i>
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
function getAllTask() {
    $.ajax({
        method: 'GET',
        url: base_url + '/tasks/complete',
        headers: {
            token: token
        }
    })
        .done(result => {
            if (result.tasks.length < 1) {
                $('.hide-tr').hide()
                $('.tasks').append(`
                     <h3 class="card-today">You Dont Have any task</h3>
        `)
            } else {
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
                                    <button type="button" class="btn btn-danger btn-sm" onclick="taskToDelete('${task._id}')">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm" disabled">
                                                <i class="far fa-star"></i>
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
                getAllTask()
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
                .done(result => {
                    swal({
                        position: 'top',
                        type: 'success',
                        title: 'Your task has been deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    getAllTask()
                })
                .fail(err => {
                    console.log(err);

                })
        }
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
// ===============================================
