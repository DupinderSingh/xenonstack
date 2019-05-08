import {
    CHANGE_EDUCATION,
    CHANGE_EXPERIENCE,
    CHANGE_REGISTRATION_FORM,
    CLEAR_API_ERROR_MESSAGE,
    COLLEGE_LOADING,
    DO_NOT_GO_TO_REGISTRATION,
    GO_TO_REGISTERATION,
    REGISTRATION_FAILURE,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    SIGNUP_TOKEN,
    STOP_REGISTRATION_LOADING, UPDATE_SKIP_EDUCATION, UPDATE_SKIP_EXPERIENCE
} from '../../types/account/Registration';
import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    SET_UPDATE_RESUME_GO_TO_PROFILE_TRUE,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_RESUME_FAILURE,
    UPDATE_RESUME_REQUEST,
    UPDATE_RESUME_SUCCESS
} from "../../types/dashboard/profile";


export const defaultRegistrationForm = {
    f_name: "",
    l_name: "",
    email: "",
    contact: "+91",
    countries: [],
    states: [],
    cities: [],
    country: "",
    state: "",
    city: "",
    updateCountry: "", updateState: "",
    postal: "",

    collegePageLoading: false,

    education: [{
        loading: false,
        schools: [],
        school: "",
        highest_education: "",
        start: "",
        startD: "",
        startY: "",
        end: "",
        endD: "",
        endY: "",
        dateError: false,
        current: false
    }],


    youAre: "Fresher",
    experience: [{
        name: "",
        position: "",
        start: "",
        startD: "",
        startY: "",
        end: "",
        endD: "",
        endY: "",
        current: false
    }],
    totalExperience: "",
    projects: [
        {
            name: "",
            description: "",
            skills: ""
        },
        {
            name: "",
            description: "",
            skills: ""
        }
    ],


    updateInterest: [],
    selectedInterest: [],
    notify: false,
    resume: "",
    githubLink: "",
    linkedInLink: "",
    otherLink: "",


    password: "",
    confirm_password: "",
};

const initialState = {
    registrationForm: defaultRegistrationForm,
    skipEducation: false,
    skipExperience: false,
    pageLoading: false,
    message: "",
    status: "",
    error: "",
    signupToken: "",
    expire: "",
    name: "",
    sys_role: "",
    profileStatus: {
        basic: 0,
        education: 0,
        experience: 0,
        personal: 0,
        total: 0,
    },
    updateProfileStatus: "",
    updateResumeStatus: "",
    updateProfileError: "",
    updateResumeError: "",
    updateProfileGoToProfile: "",
    updateResumeGoToProfile: "",
    goToRegistration: false,
    userName: ""
};

export default function RegisterReducer(state = initialState, action) {
    switch (action.type) {
        // update profile
        case UPDATE_PROFILE_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case UPDATE_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                updateProfileStatus: 200,
                updateProfileError: false,
                updateProfileGoToProfile: true
            });
        case UPDATE_PROFILE_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                updateProfileStatus: action.response.status,
                updateProfileError: true,
                updateProfileGoToProfile: false
            });

        // update resume
        case UPDATE_RESUME_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case UPDATE_RESUME_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                updateResumeStatus: 200,
                updateResumeError: false,
                updateResumeGoToProfile: true
            });
        case UPDATE_RESUME_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                updateResumeStatus: action.response.status,
                updateResumeError: true,
                updateResumeGoToProfile: false
            });

        //get profile
        case GET_PROFILE_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case GET_PROFILE_SUCCESS:
            if (action.response.data.error) {
                return Object.assign({}, state, {
                    pageLoading: false,
                    registrationForm: defaultRegistrationForm,
                    error: true,
                    message: action.response.data.message,
                    profileStatus: {
                        basic: 0,
                        education: 0,
                        experience: 0,
                        personal: 0,
                        total: 0
                    }
                });
            } else {
                const newRegistrationForm = action.response.data.profile;
                const responseEducation = newRegistrationForm.education;
                let newEducation = [];
                // replaced school and degree.........
                if (responseEducation.length === 0) {
                    newEducation.push({
                        school: "",
                        loading: false,
                        schools: [],
                        highest_education: "",
                        start: "",
                        startD: "",
                        startY: "",
                        end: "",
                        endD: "",
                        endY: "",
                        dateError: false,
                        current: false
                    })
                } else {
                    for (let i in responseEducation) {
                        newEducation.push({
                            school: responseEducation[i].school,
                            loading: false,
                            schools: [],
                            highest_education: responseEducation[i].degree,
                            start: responseEducation[i].start,
                            startD: responseEducation[i].start.split("-")[0],
                            startY: responseEducation[i].start.split("-")[1],
                            end: responseEducation[i].end,
                            endD: responseEducation[i].end.split("-")[0],
                            endY: responseEducation[i].end.split("-")[1],
                            current: responseEducation[i].current
                        })
                    }
                }
                ;
                const responseProjects = newRegistrationForm.projects;
                let newProjects = [];
                for (let i in responseProjects) {
                    newProjects.push({
                        name: responseProjects[i]["name"],
                        description: responseProjects[i]["description"],
                        skills: responseProjects[i]["skills"]
                    })
                }
                ;

                if (newProjects.length === 0) {
                    newProjects.push({
                        name: "",
                        description: "",
                        skills: ""
                    });
                    newProjects.push({
                        name: "",
                        description: "",
                        skills: ""
                    })
                }
                if (newProjects.length === 1) {
                    newProjects.push({
                        name: "",
                        description: "",
                        skills: ""
                    })
                }
                ;
                const responseExperience = newRegistrationForm.experience;
                let newExperience = [], totalExp = 0;
                if (newRegistrationForm.whoYouAre === "Experienced") {
                    for (let i in responseExperience) {
                        if (!responseExperience[i]["current"]) {
                            let diff = Number(responseExperience[i]["end"].split("-")[1]) - Number(responseExperience[i]["start"].split("-")[1]);
                            totalExp = totalExp + diff;
                        }
                    }
                }
                if (responseExperience.length === 0) {
                    newExperience.push({
                        name: "",
                        position: "",
                        start: "",
                        startD: "",
                        startY: "",
                        end: "",
                        endD: "",
                        endY: "",
                        current: false
                    })

                } else {
                    for (let i in responseExperience) {
                        newExperience.push({
                            name: responseExperience[i]["name"],
                            position: responseExperience[i]["position"],
                            start: responseExperience[i]["start"],
                            startD: responseExperience[i]["start"].split("-")[0],
                            startY: responseExperience[i]["start"].split("-")[1],
                            end: responseExperience[i]["end"],
                            endD: responseExperience[i]["end"].split("-")[0],
                            endY: responseExperience[i]["end"].split("-")[1],
                            current: responseExperience[i]["current"]

                        })
                    }
                }
                const responseSelectedInterest = newRegistrationForm.interests;
                let selectedInterest = [];
                for (let i in responseSelectedInterest) {
                    selectedInterest.push({value: responseSelectedInterest[i], label: responseSelectedInterest[i]})
                }

                const newForm = Object.assign(newRegistrationForm,
                    {
                        collegePageLoading: false,
                        f_name: newRegistrationForm.fname,
                        l_name: newRegistrationForm.lname,
                        password: "",
                        confirm_password: "",
                        postal: newRegistrationForm.postal,
                        updateCountry: newRegistrationForm.country,
                        updateState: newRegistrationForm.state,
                        countries: state.registrationForm.countries.length > 0 ? state.registrationForm.countries : [],
                        states: state.registrationForm.states.length > 0 ? state.registrationForm.states : [],
                        cities: state.registrationForm.cities.length > 0 ? state.registrationForm.cities : [],
                        updateJob: newRegistrationForm.appliedFor,
                        jobError: "",
                        youAre: newRegistrationForm.whoYouAre,
                        education: newEducation,
                        projects: newProjects,
                        experience: newExperience,
                        totalExperience: action.response.data.totalExperience,
                        linkedInLink: newRegistrationForm.linkedin,
                        githubLink: newRegistrationForm.github,
                        otherLink: newRegistrationForm.otherLink,
                        selectedJob: {value: newRegistrationForm.appliedFor, label: newRegistrationForm.appliedFor},
                        jobs: newRegistrationForm.appliedFor,
                        selectedInterest,
                        notify: newRegistrationForm.notify,
                        resume: newRegistrationForm.resume
                    }
                );
                let profileStatus = {
                    basic: !!action.response.data.percentage.basic ? Number(action.response.data.percentage.basic) : 0,
                    education: !!action.response.data.percentage.education ? Number(action.response.data.percentage.education) : 0,
                    experience: !!action.response.data.percentage.experience ? Number(action.response.data.percentage.experience) : 0,
                    personal: !!action.response.data.percentage.personal ? Number(action.response.data.percentage.personal) : 0,
                    total: !!action.response.data.percentage.total ? Number(action.response.data.percentage.total) : 0,
                };
                localStorage.setItem("name", newRegistrationForm.fname + " " + newRegistrationForm.lname);
                return Object.assign({}, state, {
                    userName: newRegistrationForm.fname + " " + newRegistrationForm.lname,
                    pageLoading: false,
                    registrationForm: newForm,
                    profileStatus,
                    error: false,
                    message: ""
                });
            }
        case GET_PROFILE_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                registrationForm: defaultRegistrationForm,
                error: true,
                message: action.response.data.message,
                profileStatus: {
                    basic: 0,
                    education: 0,
                    experience: 0,
                    personal: 0,
                    total: 0
                }
            });
        case SIGNUP_TOKEN:
            if (!!action.response.token && !!action.response.expire && !!action.response.sys_role) {
                return Object.assign({}, state, {
                    signupToken: action.response.token,
                    expire: action.response.expire,
                    name: !!action.response.name ? action.response.name : "",
                    sys_role: action.response.sys_role
                });
            } else {
                return state
            }
        case REGISTRATION_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case REGISTRATION_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                status: 200,
                error: action.response.error,
                message: action.response.data.message
            });
        case REGISTRATION_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                message: action.response.data.message,
                status: action.response.status,
                error: action.response.error
            });
        case CHANGE_REGISTRATION_FORM:
            return Object.assign({}, state, {
                registrationForm: action.newState,
                message: "",
                status: "",
                error: "",
                updateProfileStatus: "",
                updateResumeStatus: "",
                updateProfileError: "",
                updateResumeError: "",
                updateProfileGoToProfile: "",
                updateResumeGoToProfile: ""
            });
        case CLEAR_API_ERROR_MESSAGE:
            return Object.assign({}, state, {
                message: "",
                status: "",
                error: "",
                updateProfileStatus: "",
                updateResumeStatus: "",
                updateProfileError: "",
                updateResumeError: "",
                updateProfileGoToProfile: "",
                updateResumeGoToProfile: ""
            });
        case CHANGE_EDUCATION:
            const updateEducationForm = Object.assign(state.registrationForm, {education: action.newState});
            return Object.assign({}, state, {
                registrationForm: updateEducationForm
            });
        case CHANGE_EXPERIENCE:
            const updateExperienceForm = Object.assign(state.registrationForm, {experience: action.newState});
            return Object.assign({}, state, {
                registrationForm: updateExperienceForm
            });
        case STOP_REGISTRATION_LOADING:
            return Object.assign({}, state, {
                pageLoading: false
            });
        case GO_TO_REGISTERATION:
            return Object.assign({}, state, {
                goToRegistration: true,
                status: "",
                message: "",
                error: "",
                updateProfileStatus: "",
                updateResumeStatus: "",
                updateProfileError: "",
                updateResumeError: "",
                updateProfileGoToProfile: "",
                updateResumeGoToProfile: ""
            });
        case DO_NOT_GO_TO_REGISTRATION:
            return Object.assign({}, state, {
                signupToken: "",
                expire: "",
                goToRegistration: false
            });
        case SET_UPDATE_RESUME_GO_TO_PROFILE_TRUE:
            return Object.assign({}, state, {
                updateResumeGoToProfile: true
            });
        case COLLEGE_LOADING:
            let registrationForm = state.registrationForm;
            registrationForm.collegePageLoading = action.status;
            return Object.assign({}, state, {
                registrationForm
            });
        case UPDATE_SKIP_EDUCATION:
            return Object.assign({}, state, {
                skipEducation: action.status
            });
        case UPDATE_SKIP_EXPERIENCE:
            return Object.assign({}, state, {
                skipExperience: action.status
            });
        default:
            return state
    }
}