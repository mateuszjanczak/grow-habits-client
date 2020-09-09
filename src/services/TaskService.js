class TaskService {

    getTaskList() {
        return fetch("http://localhost:8080/tasks");
    }

    getSingleTask(id) {
        return fetch(`http://localhost:8080/tasks/${id}`);
    }

    addTask(data) {
        return fetch(`http://localhost:8080/tasks`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

}

export default new TaskService();