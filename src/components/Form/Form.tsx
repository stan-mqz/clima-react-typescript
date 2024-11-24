import { useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import { SearchType } from "../../types/types"

export const Form = () => {


    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.id] : e.target.value
        })
    }

  return (
    <form className={styles.form}>
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input onChange={handleChange} value={search.city} type="text" name="city " id="city"  placeholder="Ciudad"/>
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais</label>

            <select onChange={handleChange} value={search.country} name="city" id="country">
                <option>-- Seleccione un país -- </option> 
                {countries.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                ))}
            </select>

            <input className={styles.submit} type="submit" value='Consultar clima' />
        </div>
    </form>
)
}
