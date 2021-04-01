"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = exports.validateRegisterInput = void 0;
exports.validateRegisterInput = function (name, profilePhoto, username, email, password, confirmPassword) {
    var errors = {};
    if (name.trim() === "") {
        errors.name = "O campo nome precisa ser preenchido";
    }
    if (!profilePhoto) {
        errors.profilePhoto = "É preciso inserir uma foto";
    }
    if (username.trim() === "") {
        errors.username = "O campo usuário precisa ser preenchido";
    }
    if (email.trim() === "") {
        errors.email = "O campo email precisa ser preenchido";
    }
    else {
        var regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "O campo email deve ser um endereço de email válido";
        }
    }
    if (password === "") {
        errors.password = "O campo senha precisa ser preenchida";
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = "As senhas não coincidem";
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.validateLoginInput = function (username, password) {
    var errors = {};
    if (username.trim() === "") {
        errors.username = "O campo usuário precisa ser preenchido";
    }
    if (password === "") {
        errors.password = "O campo senha precisa ser preenchida";
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};
