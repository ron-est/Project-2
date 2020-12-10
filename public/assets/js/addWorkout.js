const validateAddWorkout = ({ title, muscle, sets, reps, weight }) => {
  if (title === '') {
    return false
  }
  if (muscle === '') {
    return false
  }
  if (isNaN(parseInt(sets))) {
    return false
  }
  if (reps === '') {
    return false
  }
  if (weight) {
    if (isNaN(parseInt(weight))) {
      return false
    }
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

document.getElementById('addWorkout').addEventListener('click', event => {
  event.preventDefault()
  let workout = {
    title: document.getElementById('title').value,
    muscle: document.getElementById('muscle').value,
    sets: document.getElementById('sets').value,
    reps: document.getElementById('reps').value,
    weight: (document.getElementById('weight').value) ? document.getElementById('weight').value : null,
    description: (document.getElementById('description').value) ? document.getElementById('description').value : null
  }

  if (validateAddWorkout(workout)) {
    console.log(workout)
    let workouts = getWorkouts()
    if (!workouts.length) {
      workouts.push({ id: 0, workout: workout, ...workout })
    } else {
      workouts.push({ id: workouts[workouts.length - 1].id + 1, workout: workout, ...workout })
    }
    localStorage.setItem('fitness_edge_custom_workouts', JSON.stringify(workouts))
    document.getElementById('title').value = ''
    document.getElementById('muscle').value = ''
    document.getElementById('sets').value = ''
    document.getElementById('reps').value = ''
    document.getElementById('weight').value = ''
    document.getElementById('description').value = ''
    document.getElementById('warning').textContent = ''
    location.reload()

    // axios.post('/api/workouts', workout)
    //   .then(() => {
    //     document.getElementById('title').value = ''
    //     document.getElementById('muscle').value = ''
    //     document.getElementById('sets').value = ''
    //     document.getElementById('reps').value = ''
    //     document.getElementById('weight').value = ''
    //     document.getElementById('description').value = ''
    //     document.getElementById('warning').textContent = ''
    //     location.reload()
    //   })
    //   .catch(err => { console.log() })
  } else {
    document.getElementById('warning').textContent = "Required inputs must be filled."
  }
})

let workouts = getWorkouts()
let list = workouts.map(({ id, title, muscle, sets, reps, weight, description }) => {
  let htmlText = `
      <li>
      <p>Title: ${title}</p>
      <p>Muscle: ${muscle}</p>
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

  htmlText += `
    <button type="button" class="deleteWorkout" data-id="${id}">Delete</button>
  </li>`

  return htmlText
})

document.getElementById('customWorkouts').innerHTML = list.join('')
