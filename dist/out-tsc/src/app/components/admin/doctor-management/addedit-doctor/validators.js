//========namevalidator=========
export function nameValidator(control) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[A-Z]+[a-z]{2,30}$');
        if (!regex.test(control.value)) {
            return {
                isError: true
            };
        }
    }
    return true;
}
//========npmvalidator=========
export function npmValidator(control) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[a-z0-9_-]{10,10}$');
        if (!regex.test(control.value)) {
            return {
                isError: true
            };
        }
    }
    return true;
}
//========zipValidator=========
export function zipValidator(control) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[0-9]{6}$');
        if (!regex.test(control.value)) {
            return {
                isError: true
            };
        }
    }
    return true;
}
//========phoneValidator=========
export function phoneValidator(control) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[0-9]{10}$');
        if (!regex.test(control.value)) {
            return {
                isError: true
            };
        }
    }
    return true;
}
//========matchpwd=========
export function matchpwd(control) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const cnfpwd = control.value;
        const pwd = control.root.get('password');
        if (pwd) {
            const conpval = pwd.value;
            if (conpval !== cnfpwd) {
                return {
                    isError: true
                };
            }
        }
    }
    return null;
}
//# sourceMappingURL=validators.js.map