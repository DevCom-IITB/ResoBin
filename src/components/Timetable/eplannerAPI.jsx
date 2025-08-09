const BASE_URL = "http://localhost:8000/api/eplanner";

class EplannerAPI {

    static async getExams(){
        const response = await fetch(`${BASE_URL}/exams/`);
        if(!response.ok)
            throw new Error("Failed to fetch exams");
        return response.json();
    }

    static async createExam(examData){
        const response = await fetch(`${BASE_URL}/exams/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(examData)
        })
        if(!response.ok)
            throw new Error("Failed to create exam");
        return response.json();
    }

    static async getPersonals(){
        const response = await fetch(`${BASE_URL}/personals/`);
        if(!response.ok)
            throw new Error("Failed to fetch personals");
        return response.json();
    }

    static async createPersonal(personalData){
        const response = await fetch(`${BASE_URL}/personals/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personalData)
        })
        if(!response.ok)
            throw new Error("Failed to create personal");
        return response.json();
    }

    static async deletePersonal(personalId){
        const response = await fetch(`${BASE_URL}/personals/${personalId}/`, {
            method: 'DELETE',
        });
        if(!response.ok)
            throw new Error("Failed to delete personal");
        return response.ok;
    }

    static async deletePersonalall(){
        const response = await fetch(`${BASE_URL}/personals/all/`, {
            method: 'DELETE',
        });
        if(!response.ok)
            throw new Error("Failed to delete all personals");
        return response.json();
    }

    static async getReminders(){
        const response = await fetch(`${BASE_URL}/reminders/`);
        if(!response.ok)
            throw new Error("Failed to fetch reminders");
        return response.json();
    }

    static async createReminder(reminderData){
        const response = await fetch(`${BASE_URL}/reminders/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reminderData)
        })
        if(!response.ok)
            throw new Error("Failed to create reminder");
        return response.json();
    }
}

export default EplannerAPI;  // Export the class, not an instance