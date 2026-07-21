
function InvestmentForm({

    formData,

    handleChange,

    handleSubmit,

    isEditing

}) {

    return (

        <form
            className="investment-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                name="name"
                placeholder="Investment Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="platform"
                placeholder="Platform"
                value={formData.platform}
                onChange={handleChange}
            />

            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
            >

                <option value="Stock">Stock</option>

                <option value="Mutual Fund">Mutual Fund</option>

                <option value="ETF">ETF</option>

                <option value="Crypto">Crypto</option>

                <option value="Gold">Gold</option>

            </select>

            <input
                type="number"
                name="investedAmount"
                placeholder="Invested Amount"
                value={formData.investedAmount}
                onChange={handleChange}
            />

            <input
                type="number"
                name="currentValue"
                placeholder="Current Value"
                value={formData.currentValue}
                onChange={handleChange}
            />

            <button type="submit">

                {

                    isEditing

                        ? "Update Investment"

                        : "Add Investment"

                }

            </button>

        </form>

    );

}

export default InvestmentForm;
