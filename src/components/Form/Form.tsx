import { useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../types/types";
import { Alert } from "../Alert/Alert";

type FormProps = {
    fetchWeather: () => void
}

export const Form = ({fetchWeather}: FormProps) => {


  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setALert] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setALert("Hay campos vacíos");
      return;
    }


    fetchWeather()

  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          onChange={handleChange}
          value={search.city}
          type="text"
          name="city "
          id="city"
          placeholder="Ciudad"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Pais</label>

        <select
          onChange={handleChange}
          value={search.country}
          name="city"
          id="country"
        >
          <option>-- Seleccione un país -- </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        <input
          className={styles.submit}
          type="submit"
          value="Consultar clima"
        />
      </div>
    </form>
  );
};
