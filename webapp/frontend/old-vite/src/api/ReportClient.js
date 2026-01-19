import axios from 'axios';

const API_BASE = '/api'; // Using proxy

export const ReportClient = {
    getDates: async () => {
        const response = await axios.get(`${API_BASE}/dates`);
        return response.data;
    },

    getReportsByDate: async (date) => {
        const response = await axios.get(`${API_BASE}/reports/${date}`);
        return response.data;
    },

    getReportDetail: async (date, code) => {
        const response = await axios.get(`${API_BASE}/reports/${date}/${code}`);
        return response.data;
    }
};
