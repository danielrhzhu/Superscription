import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputsTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string | null;
  textarea?: boolean;
  addon?: any;
  numberfield?: boolean;
  precision?: number;
  needError?: boolean;
  isDisabled?: boolean;
  mb?: number;
  addonright?: any;
  switchBool?: boolean;
  defaultValue?: number;
  isChecked?: boolean;
};
export const InputTextField: React.FC<InputsTextFieldProps> = ({
  placeholder,
  label,
  textarea,
  size: _,
  addon,
  numberfield,
  precision,
  needError,
  isDisabled,
  mb,
  addonright,
  switchBool,
  defaultValue,
  isChecked,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl
      display={switchBool ? "flex" : ""}
      alignItems={switchBool ? "center" : ""}
      mb={mb}
      isInvalid={!!error}
      isDisabled={isDisabled}
    >
      <FormLabel htmlFor={field.name}>
        <Text fontSize={{ sm: "sm", md: "md" }}>{label}</Text>
      </FormLabel>

      {numberfield ? (
        <>
          <NumberInput precision={precision} defaultValue={defaultValue}>
            <InputGroup>
              {!!addon ? <InputLeftAddon p="0" children={addon} /> : null}
              <NumberInputField
                {...props}
                {...field}
                id={field.name}
                fontSize={{ sm: "sm", md: "md" }}
                placeholder={placeholder}
              />
            </InputGroup>
            {!!addonright ? (
              <InputRightElement pr="10" pl="5" children={addonright} />
            ) : null}
          </NumberInput>
        </>
      ) : (
        <>
          {switchBool ? (
            <Switch
              mb="1"
              {...(props as any)}
              {...field}
              isDisabled={isDisabled}
              id={field.name}
              defaultChecked={isChecked}
            />
          ) : (
            <InputGroup>
              <Input
                {...props}
                {...field}
                fontSize={{ sm: "sm", md: "md" }}
                id={field.name}
                placeholder={placeholder}
              />
            </InputGroup>
          )}
        </>
      )}

      {error && needError ? (
        <FormErrorMessage fontSize={{ sm: "sm", md: "md" }}>
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
