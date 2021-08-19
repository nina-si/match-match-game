export class Validator {
  private form;

  private fields;

  constructor(form: Element | null, fields: string[]) {
    this.form = form;
    this.fields = fields;
  }

  validateOnInput(): void {
    this.fields.forEach((field) => {
      const input = <HTMLInputElement>document.querySelector(`#${field}`);
      if (!input) throw Error('Input element not found');

      input?.addEventListener('input', () => {
        this.validateFields(input);
        const submitBtn = <HTMLInputElement>document.querySelector('.submit-btn');
        const successIcons = document.querySelectorAll('.icon-success');
        let validFields = 0;
        successIcons.forEach((el) => {
          if (!el.classList.contains('hidden')) validFields++;
        });
        if (validFields === 3) {
          submitBtn.disabled = false;
        }
      });
    });
  }

  validateFields(field: HTMLInputElement): void {
    if (field.type === 'email') {
      const re = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (
        re.test(field.value)
        && field.value.length > 0
        && field.value.length < 31
      ) {
        this.setStatus(field, null, 'success');
      } else {
        this.setStatus(field, 'Please enter valid email address', 'error');
      }
    }
    if (field.type === 'text') {
      const re = /^[^(~!@#$%*()_—+=|:;"'`<>,.?/^0-9)]{1,30}$/;
      if (re.test(field.value)) {
        this.setStatus(field, null, 'success');
      } else {
        this.setStatus(
          field,
          `${field.previousElementSibling?.textContent} should be less than 30 symbols and should contain only letters`,
          'error',
        );
      }
    }
  }

  setStatus = (field: HTMLInputElement, message: string | null, status: string): void => {
    const successIcon = field.parentElement?.querySelector('.icon-success');
    const errorIcon = field.parentElement?.querySelector('.icon-error');
    const errorMessage = <HTMLElement>field.parentElement?.querySelector('.error-message');

    if (status === 'success') {
      if (errorIcon) {
        errorIcon.classList.add('hidden');
      }
      if (errorMessage) {
        errorMessage.innerHTML = '';
      }
      successIcon?.classList.remove('hidden');
      field.classList.remove('input-error');
    }

    if (status === 'error') {
      if (successIcon) {
        successIcon.classList.add('hidden');
      }
      errorMessage.textContent = message;
      errorIcon?.classList.remove('hidden');
      field.classList.add('input-error');
    }
  };
}
