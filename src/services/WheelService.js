class WheelService {

    roll(data) {
        return fetch(`http://localhost:8080/roll`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

}

export default new WheelService();