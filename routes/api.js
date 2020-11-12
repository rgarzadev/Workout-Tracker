const db = require("../models");

module.exports = function(app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .then(result => {
            res.json(result);
        });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create({})
        .then(result => {
            res.json(result);
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
        const workoutId = req.params.id;
        const newExercise = req.body

        db.Workout.findById(workoutId)
        .then(result => {
            const newExercises = result.exercises;
            newExercises.push(newExercise);

            db.Workout.findByIdAndUpdate(workoutId, {
                exercises: newExercises
            })
            .then(result => {
                res.json(result)
            }).catch(error => {
                console.log("Error: " + error);
            });
        });        
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).limit(7)
        .then(result => {
            res.json(result);
        })
    });
}