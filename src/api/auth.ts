export async function login({ username, password }: { username: string; password: string }) {
    const url = `${import.meta.env.VITE_API_ROOT}/auth/login`;   
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                credentials: {
                    username, 
                    password  
                },
            }),
        });

        const json = await res.json();
        if (!res.ok) {
            return({
                error: json.message,
            });
        }

        return json;
    } catch (error) {
        console.log(error);
    }
}

export async function signup({ username, password }: { username: string; password: string }) {
    const url = `${import.meta.env.VITE_API_ROOT}/auth/signup`;   
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                credentials: {
                    username, 
                    password  
                },
            }),
        });

        if (!res.ok) {
            throw new Error('Signup failed');
        }

        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}