export const contactPageSelectors = {
    contactForm: {
        form: '.et_pb_contact',
        nameInput: '#et_pb_contact_name_0',
        surnameInput: '#et_pb_contact_surname_0',
        emailInput: '#et_pb_contact_email_0',
        phoneInput: '#et_pb_contact_phone_0',
        messageTextArea: '#et_pb_contact_message_0',
        emailAgreeChbk: '.et_pb_contact_field_checkbox label[for="et_pb_contact_contact-form-radio_5_0"] i',
        phoneAgreeChbk: '.et_pb_contact_field_checkbox label[for="et_pb_contact_contact-form-radio_5_1"] i',
        textAgreeChbk: '.et_pb_contact_field_checkbox label[for="et_pb_contact_contact-form-radio_5_2"] i',
        termsChbk: '.et_pb_contact_field_checkbox label[for="et_pb_contact_terms_and_conditions_6_0"] i',
        fevCategoryDropDown:
            '.et_pb_contact_field select[data-original_id="which_product_category_interests_you_the_most?"]',
        submitButton: '.et_pb_contact_submit',
        successLabel: '.et-pb-contact-message p',
        validationMessages: '.et-pb-contact-message ul li',
    },
};
