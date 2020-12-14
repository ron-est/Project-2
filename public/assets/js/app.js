
let day = 'monday'
let workoutIndex = '-1'
let customWorkoutId = '-1'


const getCustomWorkouts = () => {
  return JSON.parse(localStorage.getItem('fitness_edge_custom_workouts'))
}

const setCustomWorkouts = (custom) => {
  return localStorage.setItem('fitness_edge_custom_workouts', JSON.stringify(custom))
}

const setRoutines = (routines) => {
  localStorage.setItem('fitness_edge_weekly_routines', JSON.stringify(routines))
}
const getRoutines = () => {
  return JSON.parse(localStorage.getItem('fitness_edge_weekly_routines'))
}


const randInt = (max) => {
  return Math.floor(Math.random() * max)
}

///Renders the data tables for Premade Workouts

const renderPremadeWorkoutsTable = () => {
  let htmlText = document.getElementById("premadeTable").innerHTML
  axios.get('/api/workouts')
    .then(({ data }) => {
      let types = {
        legs: [],
        chest: [],
        shoulders: [],
        back: [],
        biceps: [],
        triceps: [],
        core: []
      }

      data.forEach(workout => {
        types[workout.muscle].push(workout)
      })
      let len = 0
      let muscles = ["legs", "chest", "shoulders", "back", "biceps", "triceps", "core"]
      for (let i = 0; i < 7; i++) {
        if (types[muscles[i]].length > len) {
          len = types[muscles[i]].length
        }
      }
      let htmlText = ''
      for (let i = 0; i < len; i++) {
        htmlText += '<tr>'
        for (let j = 0; j < 7; j++) {
          if (types[muscles[j]].length > i) {
            let { id, title } = types[muscles[j]][i]
            htmlText += `<td class="premadeWorkout z-depth-2 hoverable" data_id="${id}">${title}</td>`
          } else {
            htmlText += `<td class="z-depth-2"></td>`
          }
        }
        htmlText += '</tr>'
      }
      document.getElementById("premadeTable").innerHTML = htmlText
    })
}

///Adding and Editing Custom Workouts to Routines

const clearAddCustomForm = () => {
  document.getElementById('title').value = ''
  document.getElementById('legs').checked = true
  document.getElementById('sets').value = ''
  document.getElementById('reps').value = ''
  document.getElementById('weight').value = ''
  document.getElementById('description').value = ''
  document.getElementById('warning').textContent = ''
}

const getSelectedMuscle = () => {
  let muscles = document.querySelectorAll('input[name="muscle"]')
  let len = muscles.length
  for (let i = 0; i < len; i++) {
    if (muscles[i].checked) {
      return muscles[i].value
    }
  }
}

const validateWorkout = ({ title, sets, reps }) => {
  if (title === '') {
    return false
  }
  if (isNaN(parseInt(sets))) {
    return false
  }
  if (reps === '') {
    return false
  }

  return true
}

document.getElementById("weight").addEventListener("input", (event) => {
  let target = event.target
  target.value = target.value.replace(/[^0-9.]/g, '')
})

document.getElementById("sets").addEventListener("input", (event) => {
  let target = event.target
  target.value = target.value.replace(/[^0-9.]/g, '')
})

document.getElementById('addCustomToRoutine').addEventListener('click', event => {
  let workout = {
    title: document.getElementById('title').value,
    muscle: getSelectedMuscle(),
    sets: document.getElementById('sets').value,
    reps: document.getElementById('reps').value,
    weight: (document.getElementById('weight').value) ? document.getElementById('weight').value : null,
    description: (document.getElementById('description').value) ? document.getElementById('description').value : null
  }

  if (validateWorkout(workout)) {
    let routines = getRoutines()

    if (workoutIndex < 0) {
      routines[day].push(workout)
    } else {
      routines[day][workoutIndex] = workout
    }

    setRoutines(routines)
    renderSingleRoutine(day)

    clearAddCustomForm()
    $('.modal').modal().close()

  } else {
    document.getElementById('warning').textContent = "Required inputs must be filled correctly."
  }
})

///Change ModelTitle
const changeModelTitle = () => {
  let modalTitle = document.getElementById("modalTitle")

  modalTitle.textContent = 'What workouts are we doing this { day }?'
  modalTitle.textContent = modalTitle.textContent.replace("{ day }", day[0].toUpperCase() + day.substring(1))
}


///Listener for Click Events///
document.addEventListener('click', (event) => {
  if (event.target.classList.contains("addWorkout")) {

    day = event.target.dataset.day
    workoutIndex = -1

    changeModelTitle()
    clearAddCustomForm()

  } else if (event.target.classList.contains("premadeWorkout")) {
    // let id = event.target.dataset.id
    // axios.get(`/api/workouts/${id}`)
    // .then(({data})=>{

    // })
    // .catch(err=>console.log(err))
  } else if (event.target.classList.contains("editWorkout")) {
    day = event.target.dataset.day
    workoutIndex = event.target.dataset.index
    changeModelTitle()

    let { title, muscle, sets, reps, weight, description } = getRoutines()[day][workoutIndex]

    document.getElementById("title").value = title
    document.getElementById(muscle).checked = true
    document.getElementById("sets").value = sets
    document.getElementById("reps").value = reps

    if (weight) {
      document.getElementById("weight").value = weight
    } else {
      document.getElementById("weight").value = ''
    }

    if (description) {
      document.getElementById("description").value = description
    } else {
      document.getElementById("description").value = ''
    }

  } else if (event.target.classList.contains('deleteWorkout')) {
    day = event.target.dataset.day
    workoutIndex = event.target.dataset.index

    let routines = getRoutines()
    routines[day].splice(workoutIndex, 1)

    setRoutines(routines)
    renderSingleRoutine(day)

  } else if (event.target.classList.contains('deleteRoutine')) {
    day = event.target.dataset.day

    let routines = getRoutines()
    routines[day] = []

    setRoutines(routines)
    renderSingleRoutine(day)
  }

})

///Rendering Workout and Routines
const renderWorkout = (day, index) => {
  let { title, muscle, sets, reps, weight, description } = getRoutines()[day][index]
  htmlText += `
    <h6 class="truncate wrkotTitle ">
      <a class="halfway-fab waves-effect waves-light modal-trigger" href="#modal">
        <i class="material-icons editWorkout" data-day="${day}" data-workoutIndex="${index}">fitness_center</i>
      </a>
      ${title}
    </h6>
    <p id="">Muscle: ${muscle}</p>
    <p>Sets: ${sets}</p>
    <p>Reps: ${reps}</p>
          `

  if (weight) {
    htmlText += `<p>Weight: ${weight}</p>`
  }
  if (description) {
    htmlText += `
                <label>Description:</label> 
                <p>${description}</p>`
  }
  document.getElementById(`${day}-${index}`).innerHTML = htmlText
}

const renderSingleRoutine = (day) => {
  let htmlText = ''
  let routine = getRoutines()[day]
  routine.forEach(({ title, muscle, sets, reps, weight, description }, i) => {
    htmlText += `
      <div class="card hoverable wrkotCard" id="${day}-${i}">
        <h6 class="truncate wrkotTitle ">
          <a class="halfway-fab waves-effect waves-light modal-trigger" href="#modal">
            <i class="material-icons editWorkout" data-day="${day}" data-index="${i}">fitness_center</i>
          </a>
          ${title}
        </h6>
        <p id="">Muscle: ${muscle}</p>
        <p>Sets: ${sets}</p>
        <p>Reps: ${reps}</p>
          `

    if (weight) {
      htmlText += `<p>Weight: ${weight}</p>`
    }
    if (description) {
      htmlText += `
        <label>Description:</label> 
        <p>${description}</p>`
    }
    htmlText += '</div>'
  })
  document.getElementById(`${day}Routine`).innerHTML = htmlText
}

const renderAllRoutines = () => {

  let weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  let routines = getRoutines()
  weekdays.forEach(day => {
    renderSingleRoutine(day)
  })

}

///Initalizing

const init = () => {
  let workouts = JSON.parse(localStorage.getItem('fitness_edge_custom_workouts'))
  if (!workouts) {
    workouts = []
    localStorage.setItem('fitness_edge_custom_workouts', JSON.stringify([]))
  }

  let routines = JSON.parse(localStorage.getItem('fitness_edge_weekly_routines'))
  if (!routines) {
    let routines = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }

    localStorage.setItem('fitness_edge_weekly_routines', JSON.stringify(routines))
  }

  renderAllRoutines()
  renderPlaceholderTable()

}

init()