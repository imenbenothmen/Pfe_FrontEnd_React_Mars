import axios from 'axios';

const apiUrl = 'http://localhost:5000/complaints';


export async function getAllComplaints() {
  return await axios.get(`${apiUrl}`);
}
// POST – Submit a complaint
export async function submitComplaint(complaintData) {
    return await axios.post(`${apiUrl}`, complaintData);
}

// GET – Get the status of a complaint
export async function getComplaintStatus(complaintId) {
    return await axios.get(`${apiUrl}/${complaintId}/status`);
}

// PUT – Update the status of a complaint
export async function updateComplaintStatus(complaintId, newStatus) {
    return await axios.put(`${apiUrl}/${complaintId}/status`, { statut: newStatus });
}

// GET – Get the details of a complaint
export async function getComplaintDetails(complaintId) {
    return await axios.get(`${apiUrl}/${complaintId}/details`);
}

// PUT – Resolve a complaint
export async function resolveComplaint(complaintId) {
    return await axios.put(`${apiUrl}/${complaintId}/resolve`);
}

// PUT – Archive a complaint
export async function archiveComplaint(complaintId) {
    return await axios.put(`${apiUrl}/${complaintId}/archive`);
}

// DELETE – Delete a complaint
export async function deleteComplaint(complaintId) {
    return await axios.delete(`${apiUrl}/${complaintId}`);
}
