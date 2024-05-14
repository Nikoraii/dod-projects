'use server';

export async function fetchData() {
    const response = await fetch("https://code.mil/code.json");
    const data = await response.json();
    
    return data;
}