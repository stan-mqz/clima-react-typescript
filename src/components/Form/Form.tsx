import { countries } from "../../data/countries"
import styles from "./Form.module.css"

export const Form = () => {
  return (
    <form className={styles.form}>
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input type="text" name="city " id="city"  placeholder="Ciudad"/>
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais</label>

            <select name="city" id="">
                <option value="">-- Seleccione un país -- </option> 
                {countries.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                ))}
            </select>

            <input className={styles.submit} type="submit" value='Consultar clima' />
        </div>
    </form>
)
}
