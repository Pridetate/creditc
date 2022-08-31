interface ErrorResult {
  error_present: boolean;
  error_text: string;
  update: boolean;
}
export const CVCValidator = (value: string): ErrorResult => {
  if (value.length > 0 && Number(value)) {
    if (value.length === 3) {
      return {
        error_text: "",
        error_present: false,
        update: true,
      };
    } else if (value.length < 3) {
      return {
        error_text: "CVC should have 3 digits",
        error_present: true,
        update: true,
      };
    } else {
      return {
        error_text: "CVC should have 3 digits",
        error_present: true,
        update: false,
      };
    }
  } else {
    if (value.length === 0) {
      return {
        error_text: "Please enter valid digits",
        error_present: true,
        update: true,
      };
    } else if (value === "0") {
      return {
        error_text: "Please enter valid digits",
        error_present: true,
        update: true,
      };
    } else {
      return {
        error_text: "Please enter valid digits",
        error_present: true,
        update: false,
      };
    }
  }
};

export const NumberValidator = (value: string): ErrorResult => {
  if (value.length > 0 && Number(value)) {
    if (value.length === 16) {
      return {
        error_text: "",
        error_present: false,
        update: true,
      };
    } else if (value.length < 16) {
      return {
        error_text: "number should have 16 digits",
        error_present: true,
        update: true,
      };
    } else {
      return {
        error_text: "number should have 16 digits",
        error_present: true,
        update: true,
      };
    }
  } else {
    if (value.length === 0 || value === "0") {
      return {
        error_text: "number should have 16 digits",
        error_present: true,
        update: true,
      };
    } else {
      return {
        error_text: "Please enter valid digits",
        error_present: true,
        update: false,
      };
    }
  }
};

export const NameValidator = (value: string): ErrorResult => {
  if (value.length >= 1) {
    return {
      error_text: "",
      error_present: false,
      update: true,
    };
  } else {
    return {
      error_text: "name should have 1 character",
      error_present: true,
      update: true,
    };
  }
};

export const ExpiryValidator = (value: string): ErrorResult => {
  if (value.length > 0 && Number(value)) {
    if (value.length === 4) {
      let firstTwo = value.substring(0, 2);
      let secondTwo = value.substring(2, 4);
      console.log(secondTwo);
      if (Number(firstTwo) < 13) {
        if (Number(secondTwo) > 22 && Number(secondTwo) < 50) {
          return {
            error_text: "",
            error_present: false,
            update: true,
          };
        } else {
          return {
            error_text: "The second 2 digits should be a year",
            error_present: true,
            update: true,
          };
        }
      } else {
        return {
          error_text: "The first 2 digits should be a valid month",
          error_present: true,
          update: true,
        };
      }
    } else {
      if (value.length < 4) {
        return {
          error_text: "Please enter 4 valid digits",
          error_present: true,
          update: true,
        };
      } else {
        return {
          error_text: "Please enter valid digits",
          error_present: true,
          update: false,
        };
      }
    }
  } else {
    if (value.length === 0 || value === "0") {
      return {
        error_text: "Please enter valid digits",
        error_present: true,
        update: true,
      };
    } else {
      return {
        error_text: "Please enter valid digits",
        error_present: true,
        update: false,
      };
    }
  }
};
