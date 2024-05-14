'use server';

export async function fetchData() {
    const response = await fetch("https://code.mil/code.json");
    const data: DoD = await response.json();
    
    return data;
}