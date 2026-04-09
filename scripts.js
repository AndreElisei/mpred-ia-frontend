const url = "http://127.0.0.1:5000";

// 🔹 carregar equipamentos
const getEquipamentos = async () => {
    try {
        let response = await fetch(`${url}/equipamentos`);
        let data = await response.json();

        let lista = document.getElementById("lista");
        lista.innerHTML = "";

        data.equipamentos.forEach(e => {
            let card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>ID: ${e.id} - ${e.nome}</h3>
                <p><b>Tipo:</b> ${e.tipo}</p>
                <p><b>Tag:</b> ${e.tag}</p>
                <p><b>Anomalias:</b><br>
                    ${
                        e.anomalias.length > 0
                        ? e.anomalias.map(a => `${a.descricao} - ${a.status}`).join("<br>")
                        : "Nenhuma"
                    }
                </p>
                <button onclick="deleteEquipamento(${e.id})">🗑️ Deletar</button>
            `;

            lista.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar equipamentos:", error);
    }
};

// 🔹 adicionar equipamento
const addEquipamento = async () => {
    try {
        let nome = document.getElementById("nome").value;
        let tipo = document.getElementById("tipo").value;
        let tag = document.getElementById("tag").value;

        let formData = new FormData();
        formData.append("nome", nome);
        formData.append("tipo", tipo);
        formData.append("tag", tag);

        const response = await fetch(`${url}/equipamento`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log("Equipamento criado:", data);
        alert("Operação realizada com sucesso!");

        // limpar campos
        document.getElementById("nome").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("tag").value = "";

        getEquipamentos();

    } catch (error) {
        console.error("Erro ao adicionar equipamento:", error);
    }
};

// 🔹 adicionar anomalia
const addAnomalia = async () => {
    try {
        let descricao = document.getElementById("descricao").value;
        let status = document.getElementById("status").value;
        let equipamento_id = document.getElementById("equipamento_id").value;

        let formData = new FormData();
        formData.append("descricao", descricao);
        formData.append("status", status);
        formData.append("equipamento_id", equipamento_id);

        const response = await fetch(`${url}/anomalia`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log("Anomalia criada:", data);
        alert("Operação realizada com sucesso!");
        
        // limpar campos
        document.getElementById("descricao").value = "";
        document.getElementById("status").value = "";
        document.getElementById("equipamento_id").value = "";

        getEquipamentos();

    } catch (error) {
        console.error("Erro ao adicionar anomalia:", error);
    }
};

// 🔹 deletar equipamento
const deleteEquipamento = async (id) => {
    try {
        await fetch(`${url}/equipamento/${id}`, {
            method: "DELETE"
        });

        getEquipamentos();
    } catch (error) {
        console.error("Erro ao deletar:", error);
    }
};


// 🔹 carregar ao abrir
window.onload = () => {
    getEquipamentos();
};