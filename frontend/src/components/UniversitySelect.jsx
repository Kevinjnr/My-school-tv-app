import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import universityData from "../data/universities.json"; // import your local file

export const UniversitySelect = ({ name, label, icon }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  // Sort universities alphabetically by name
  const sortedUniversities = universityData
    .slice() // copy to avoid mutating original data
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormControl isInvalid={touched[name] && !!errors[name]}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none">
            {icon}
          </InputLeftElement>
        )}
        <Select
          pl={icon ? "2.5rem" : "1.5rem"}
          value={values[name]}
          onChange={(e) => setFieldValue(name, e.target.value)}
          placeholder="Select a University"
        >
          {sortedUniversities.map((uni) => (
            <option key={uni.name} value={uni.name}>
              {uni.name}
            </option>
          ))}
        </Select>
      </InputGroup>
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
};
