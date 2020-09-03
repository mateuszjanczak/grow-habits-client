class TaskService {

    getTaskList() {
        return fetch("http://localhost:8080/tasks");
    }

    getSingleTask(id) {
        return fetch(`http://localhost:8080/tasks/${id}`);
    }

}

export default new TaskService();