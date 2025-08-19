import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';

export const InputField = ({
  name,
  label,
  icon,
  multiline = false,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const commonProps = {
    id: name,
    focusBorderColor: '#80DEE6',
    pl: icon ? '2.5rem' : undefined,
    ...props,
  };

  const handleFileChange = (e) => {
    setFieldValue(name, e.currentTarget.files[0]);
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
        {type === "file" ? (
          <Input type="file" onChange={handleFileChange} {...commonProps} />
        ) : multiline ? (
          <Textarea resize="none" {...field} {...commonProps} />
        ) : (
          <Input type={type} {...field} {...commonProps} />
        )}
      </InputGroup>
      {meta.error && meta.touched && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );
};
