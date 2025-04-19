export const fetchJobs = async(page=1) =>{
    const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?${page}`);
    if(!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
};