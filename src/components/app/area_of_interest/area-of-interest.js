export const areaOfInterest = [
    { value: 'Business Intelligence', label: 'Business Intelligence', category: "AI and Cognitive Solutions"},
    { value: 'Computer Vision and Machine Learning', label: 'Computer Vision and Machine Learning', category: "AI and Cognitive Solutions"},
    { value: 'Deep learning', label: 'Deep learning', category: "AI and Cognitive Solutions"},
    { value: 'NLP and Text Analytics', label: 'NLP and Text Analytics', category: "AI and Cognitive Solutions"},
    { value: 'DataOps', label: 'DataOps', category: "AI and Cognitive Solutions"},
    { value: 'cloud infrastructure', label: 'cloud infrastructure', category: "Software and Services"},
    { value: 'Devops and SRE', label: 'Devops and SRE', category: "Software and Services"},
    { value: 'Cloud Security', label: 'Cloud Security', category: "Software and Services"},
    { value: 'Data engineering', label: 'Data engineering', category: "Software and Services"},
    { value: 'DataWarehousing', label: 'DataWarehousing', category: "Software and Services"},
    { value: 'IoT Platform Developers', label: 'IoT Platform Developers', category: "Digital Transformation and IoT"},
    { value: 'Real Time And Stream Processing', label: 'Real Time And Stream Processing', category: "Digital Transformation and IoT"},
    { value: 'Data Science and AI', label: 'Data Science and AI', category: "Digital Transformation and IoT"},
    { value: 'Human Interface Design', label: 'Human Interface Design', category: "Product Design and Platform Development"},
    { value: 'Communications Design', label: 'Communications Design', category: "Product Design and Platform Development"},
    { value: 'Enterprise Platform Architect', label: 'Enterprise Platform Architect', category: "Product Design and Platform Development"},
    { value: 'Solution Architect', label: 'Solution Architect', category: "Product Design and Platform Development"},
    { value: 'DevOps and Application Managed Services', label: 'DevOps and Application Managed Services', category: "Managed Services"},
    { value: 'Big Data Managed Services', label: 'Big Data Managed Services', category: "Managed Services"},
    { value: 'ML/DL Managed Services', label: 'ML/DL Managed Services', category: "Managed Services"},
    { value: 'Security Managed Services', label: 'Security Managed Services', category: "Managed Services"},
    { value: 'Business Development', label: 'Business Development', category: "Sales and Marketing"},
    { value: 'Sales Professionals', label: 'Sales Professionals', category: "Sales and Marketing"},
    { value: 'Marketing Professionals', label: 'Marketing Professionals', category: "Sales and Marketing"},
    { value: 'Social Media Marketing', label: 'Social Media Marketing', category: "Sales and Marketing"},
    { value: 'HR Business partner', label: 'HR Business partner', category: "Corporate Functions"},
    { value: 'Talent Aquisition', label: 'Talent Aquisition', category: "Corporate Functions"},
    { value: 'Learning and Training Development', label: 'Learning and Training Development', category: "Corporate Functions"},
    { value: 'Finance', label: 'Finance', category: "Corporate Functions"},
    { value: 'Legal', label: 'Legal', category: "Corporate Functions"}
];

export const jobOptions = [
    { value: 'AI and Cognitive Solutions', label: 'AI and Cognitive Solutions'},
    { value: 'Software and Services', label: 'Software and Services'},
    { value: 'Digital Transformation and IoT', label: 'Digital Transformation and IoT'},
    { value: 'Product Design and Platform Development', label: 'Product Design and Platform Development'},
    { value: 'Managed Services', label: 'Managed Services'},
    { value: 'Sales and Marketing', label: 'Sales and Marketing'},
    { value: 'Corporate Functions', label: 'Corporate Functions'}
];

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected ? data.color : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ?  'white'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: null,
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: data.color,
            color: 'white',
        },
    }),
};
