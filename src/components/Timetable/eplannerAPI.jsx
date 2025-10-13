import { APIInstance } from '../../config/api';

class EplannerAPI {

    static async getExams(){
        const response = await APIInstance.get('/eplanner/exams/');
        return response;
    }

    static async createExam(examData){
        const response = await APIInstance.post('/eplanner/exams/', examData);
        return response;
    }

    static async updateExam(examId, examData){
        const response = await APIInstance.put(`/eplanner/exams/${examId}/`, examData);
        return response;
    }
    
    static async deleteExam(examId){
        const response = await APIInstance.delete(`/eplanner/exams/${examId}/`);
        return response;
    }

    static async deleteExamAll(){
        const response = await APIInstance.delete('/eplanner/exams/all/');
        return response;
    }    
    
    static async getPersonals(){
        const response = await APIInstance.get('/eplanner/personals/');
        return response;
    }

    static async createPersonal(personalData){
        const response = await APIInstance.post('/eplanner/personals/', personalData);
        return response;
    }

    static async updatePersonal(personalId, personalData){
        const response = await APIInstance.put(`/eplanner/personals/${personalId}/`, personalData);
        return response;
    }

    static async deletePersonal(personalId){
        const response = await APIInstance.delete(`/eplanner/personals/${personalId}/`);
        return response;
    }

    static async deletePersonalall(){
        const response = await APIInstance.delete('/eplanner/personals/all/');
        return response;
    }

    static async getReminders(){
        const response = await APIInstance.get('/eplanner/reminders/');
        return response;
    }

    static async createReminder(reminderData){
        const response = await APIInstance.post('/eplanner/reminders/', reminderData);
        return response;
    }

    static async updateReminder(reminderId, reminderData){
        const response = await APIInstance.put(`/eplanner/reminders/${reminderId}/`, reminderData);
        return response;
    }
    
    static async deleteReminder(reminderId){
        const response = await APIInstance.delete(`/eplanner/reminders/${reminderId}/`);
        return response;
    }

    static async deleteReminderall(){
        const response = await APIInstance.delete('/eplanner/reminders/all/');
        return response;
    }
}

export default EplannerAPI;  // Export the class, not an instance