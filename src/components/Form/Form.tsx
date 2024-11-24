import { countries } from "../../data/countries"

export const Form = () => {
  return (
    <form>
        <div className="">
            <label htmlFor="city">Ciudad:</label>
            <input type="text" name="city " id="city"  placeholder="Ciudad"/>
        </div>

        <div className="">
            <label htmlFor="country">Pais</label>

            <select name="city" id="">
                <option value="">-- Seleccione un país -- </option> 
                {countries.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                ))}
            </select>

            <input type="submit" value='Consultar clima' />
        </div>
    </form>
)
}
