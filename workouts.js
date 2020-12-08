const { Model, DataTypes } = require('sequelize')

class Workout extends Model { }

Workout.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    muscle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reps: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    }
  }, { sequelize, modelName: 'workout' })

Workout.bulkCreate([
  {
    title: 'Back Squat',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Front Squat',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Goblet Squat',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Romanian Deadlift',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Leg Press',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Lunges',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Leg Extension',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Leg Curl',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Calf Raise',
    muscle: 'legs',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Bench Press',
    muscle: 'chest',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Incline Bench Press',
    muscle: 'chest',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Dumbell Bench Press',
    muscle: 'chest',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Dumbell Incline Press',
    muscle: 'chest',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Push Up',
    muscle: 'chest',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Overhead Press',
    muscle: 'shoulders',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Seated Dumbell Press',
    muscle: 'shoulders',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Lateral Raise',
    muscle: 'shoulders',
    sets: 3,
    reps: '15-20',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Rear Pec Deck',
    muscle: 'shoulders',
    sets: 3,
    reps: '15-20',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Face Pull',
    muscle: 'shoulders',
    sets: 3,
    reps: '15-20',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Deadlift',
    muscle: 'back',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Barbell Row',
    muscle: 'back',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Lat Pulldown',
    muscle: 'back',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Seated Cable Row',
    muscle: 'back',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'T Bar Row',
    muscle: 'back',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Dumbell Row',
    muscle: 'back',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Back Extension',
    muscle: 'back',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Barbell Curl',
    muscle: 'biceps',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Dumbell Curl',
    muscle: 'biceps',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Hammer Curl',
    muscle: 'biceps',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Dips',
    muscle: 'triceps',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Tricep Pushdown',
    muscle: 'triceps',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Skull Crusher',
    muscle: 'triceps',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Overhead Tricep Extension',
    muscle: 'triceps',
    sets: 3,
    reps: '8-12',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Ab Wheel',
    muscle: 'core',
    sets: 3,
    reps: '15-20',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Hanging Leg Raise',
    muscle: 'core',
    sets: 3,
    reps: '15-20',
    weight: NULL,
    description: NULL
  },
  {
    title: 'Cable Oblique Twist',
    muscle: 'core',
    sets: 3,
    reps: '15-20',
    weight: NULL,
    description: NULL
  }
])

sequelize.sync()