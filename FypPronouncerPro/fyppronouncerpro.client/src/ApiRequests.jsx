/*import { useState, useEffect } from 'react';*/
import axios from 'axios';
import { useState, useEffect } from 'react';

const apiBaseURL = 'https://localhost:7077';
// sign up user request -- post request

export const SignUpUserRequest = async (user) => {
    try {
        const response = await axios.post(`${apiBaseURL}/AccountsManagement/signup`, user);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
};

// sign in user request -- post request

export const SignInUserRequest = async (user) => {
    try {
        const response = await axios.post('https://localhost:7077/AccountsManagement/signin', user);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

// forgot password

export const ForgotPasswordRequest = async (user) => {
    try {
        const response = await axios.post('https://localhost:7077/AccountsManagement/forgotpassword', user);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}


// save mispronunciations -- post request

export const SaveMispronunciations = async (requestObj) => {
    try {
        const response = await axios.post('https://localhost:7077/ParaLessonManagement/saveMispronunciations', requestObj);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }
    }
}

// text comparison request -- post request

export const TextComparisonRequest = async (data) => {
    try {
        console.log(data);
        const response = await axios.post('https://localhost:7077/textcomparison/comparetext', data);
        console.log("text compare api", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

// save joined lesson request -- post request

export const SaveJoinedLesson = async (request) => {
    try {
        const response = await axios.post('https://localhost:7077/ParaLessonManagement/saveJoinedLesson', request);
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

// save word in Vacubalary

export const SaveWordInVocabulary = async (request) => {
    try {
        const response = await axios.post('https://localhost:7077/ParaLessonManagement/addWordInVocabulary', request);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
}



// -------------------------------------- GET REQUESTS ------------------------------------




// all lessons requests -- get request with no parameters

export const GetAllParaLessonsRequest = async () => {
    try {
        const response = await axios.get(`https://localhost:7077/ParaLessonManagement/getAllLessons`);
        return response.data;
    }
    catch (error) {
        console.error("Error getting all lessons: ", error.message);
        throw error;
    }
}

// get all unjoinded lessons -- get request with parameters

export const GetAllLessons = (email) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://localhost:7077/ParaLessonManagement/getUnstartedLessons",
                    {
                        params: {
                            email: email
                        }
                    }
                );
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    return { data, loading, error };
};


// get my lessons request -- get request with parameters

export const GetMyLessons = async (email) => {
    try {
        const response = await axios.get(
            "https://localhost:7077/ParaLessonManagement/getMyLessons",
            {
                params: {
                    email: email
                }
            }
        );
        return { data: response.data, loading: false, error: null };
    } catch (error) {
        return { data: null, loading: false, error: error.message };
    }
};

// get mispronunciations -- get request with parameters

export const GetMispronunciations = async (email, title) => {
    try {
        const response = await axios.get(
            'https://localhost:7077/ParaLessonManagement/getMispronunciations',
            {
                params: {
                    email: email,
                    title: title,
                }
            }
        );
        console.log("got mispronunciations", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}

// remove mispronunciation

export const RemoveMispronunciation = async (email, title, word) => {
    try {
        const response = await axios.delete('https://localhost:7077/ParaLessonManagement/removeMispronunciation',
            {
                params: {
                    email: email,
                    title: title,
                    word: word,
                }
            });
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

// get completed lessons

export const GetCompletedLessons = async (email, level) => {
    try {
        const response = await axios.get('https://localhost:7077/ParaLessonManagement/getCompletedLessons', {
            params: {
                email: email,
                level: level,
            }
        });
        console.log(response.data);
        return (response.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

// get vocabulary collection

export const GetVocabularyCollection = async (email) => {
    try {
        const response = await axios.get('https://localhost:7077/ParaLessonManagement/getVocabularyCollection', {
            params: {
                email: email,
            }
        });
        return (response.data);
    } catch (error) {
        return (error.response.data);
    }
}


// get phonetic

export const GetPhoneticRequest = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return (response.data?.[0]?.phonetic || '');
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}

// get synonyms

export const GetSynonymRequest = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const synonyms = response.data?.[0]?.meanings[0]?.synonyms;
        const synonymsString = synonyms ? synonyms.join(' - ') : '';
        return (synonymsString);
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}

// get example sentence

export const GetSentenceRequest = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return (response.data?.[0]?.meanings[0]?.definitions[0]?.example);
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}
