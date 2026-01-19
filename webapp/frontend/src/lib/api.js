export const ReportClient = {
    getDates: async () => {
        const response = await fetch('/api/dates');
        if (!response.ok) throw new Error('Failed to fetch dates');
        return response.json();
    },

    getReportsByDate: async (date) => {
        const response = await fetch(`/api/reports/${date}`);
        if (!response.ok) throw new Error('Failed to fetch reports');
        return response.json();
    },

    getReportDetail: async (date, code) => {
        const response = await fetch(`/api/reports/${date}/${code}`);
        if (!response.ok) throw new Error('Failed to fetch report detail');
        return response.json();
    }
};
