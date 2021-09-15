const userRepository = {
    createSelectOption: (label, value, options) => createOption(label, value, options)
}

function createOption(label, value, options) {
    return {
        label: label,
        value: value,
        ...options
    }
}

export default userRepository;