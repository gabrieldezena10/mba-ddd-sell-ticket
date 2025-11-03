# 🧱 Persistência e Repositórios no Domain-Driven Design (DDD)

## 🎯 Resumo explicativo baseado na aula de Wesley Willians
Entenda como o DDD trata a persistência de agregados, o papel dos repositórios, e como diferentes ORMs (Active Record vs Data Mapper) impactam o design.

---

### 🔹 1. O Papel dos Repositórios

No DDD, o repositório é responsável por persistir e recuperar agregados do banco de dados.

Ele não contém regras de negócio — apenas operações de armazenamento.

**🧩 Responsabilidade única do repositório:**

- save (criar ou atualizar)
- delete
- findById
- findBy... (buscas específicas)

**🛑 O que NÃO pertence ao repositório:**  
Lógica de domínio (ex: `reservar()`, `cancelar()`, etc.)  
Essas regras ficam no agregado, não no repositório.

---

### 🏗️ 2. Relação entre Agregado e Banco de Dados

Agregados são modelos ricos e orientados a objetos.  
Bancos de dados são modelos relacionais e anêmicos.  
Portanto, é necessário converter entre esses dois mundos.

**🧩 O problema:**

- Agregado ≠ Tabela
- Objeto ≠ Registro

Cada mudança ou consulta precisa de uma conversão entre:

- 🟠 Modelo de Domínio (rico)
- 🔵 Modelo de Persistência (anêmico)

---

### 🔄 3. O Papel do Mapper

O Mapper (mapeador) faz a ponte entre o domínio e a persistência.

```js
class EventMapper {
  static toDomain(eventModel) {
    // Converte do formato do banco → agregado de domínio
    return new Event(eventModel.id, eventModel.section, eventModel.spots);
  }

  static toPersistence(eventAggregate) {
    // Converte do agregado → formato do banco
    return {
      id: eventAggregate.id,
      section: eventAggregate.section,
      spots: eventAggregate.spots,
    };
  }
}
```

O mapper é usado dentro do repositório.  
Em algumas libs, essa etapa pode ser abstraída automaticamente.

💡 *Dica:* Se o ORM não oferece suporte direto ao domínio rico, você precisa criar esse mapper manualmente.

---

### 🧩 4. Modelos: Rico x Anêmico

| Tipo de Modelo | Características | Onde é usado |
|----------------|----------------|---------------|
| **Modelo Rico** | Possui lógica de domínio, comportamentos, invariantes | DDD (agregado, entidade) |
| **Modelo Anêmico** | Apenas dados (sem regras) | ORM, camada de persistência |
| **Mapper** | Faz a ponte entre os dois | Infraestrutura |

O Mapper traduz o modelo rico do domínio em um modelo anêmico do banco (e vice-versa).

---

### ⚙️ 5. Escolha do ORM e seus impactos

A escolha da biblioteca de persistência influencia diretamente a eficiência e a complexidade da infraestrutura.  
Há dois estilos principais de ORM:

#### 🧱 Active Record

Mistura dados e operações de banco dentro da mesma classe.

A entidade herda de uma classe base (Model) que já traz métodos como `save()`, `update()`, `delete()`.

```js
class Event extends Model { ... }
```

As entidades ficam acopladas ao banco, o que viola princípios do DDD.

**🧩 ORMs Active Record comuns:**  
Sequelize (JS), Django ORM (Python), Rails Active Record (Ruby), Eloquent (PHP)

⚠️ *Problema:* mistura regras de negócio e persistência, tornando difícil manter o domínio isolado.

#### 🧩 Data Mapper

Separa completamente o domínio da persistência.  
As entidades não sabem como são salvas.  
O ORM (ou o mapper) cuida dessa conversão.

Ideal para DDD, pois mantém os agregados limpos.

**🧠 ORMs com Data Mapper maduros:**  
Hibernate (Java), Doctrine (PHP), Entity Framework (C#), MikroORM (JS)

💡 Esses ORMs permitem persistir objetos ricos diretamente, sem precisar de modelos anêmicos extras.

---

### ⚖️ 6. Comparativo: Active Record vs Data Mapper

| Aspecto | Active Record | Data Mapper |
|----------|----------------|--------------|
| **Acoplamento** | Alto (domínio + banco) | Baixo (separação clara) |
| **Facilidade inicial** | Simples de começar | Mais configuração |
| **Aderência ao DDD** | Ruim | Excelente |
| **Testabilidade** | Difícil (dependente do banco) | Alta (mock fácil) |
| **Exemplo de ORMs** | Sequelize, Eloquent | Hibernate, Doctrine, MikroORM |

✅ *Se puder escolher:* prefira **Data Mapper**  
❌ *Se estiver preso a Active Record:* aceite o custo de criar mapeadores manuais.

---

### 🧩 7. O Unit of Work

Padrão de design que coordena transações e mantém controle sobre as entidades modificadas durante uma operação.  
Garante que todas as mudanças em um agregado sejam persistidas de forma consistente.

Está presente nos ORMs mais maduros (ex: Hibernate, Doctrine, MikroORM).

💬 *O TypeORM, por exemplo, tem suporte parcial, mas sem Unit of Work completo.*

---

### 🧰 8. ORMs Citados na Aula

| Linguagem | ORMs mais comuns | Padrão |
|------------|------------------|--------|
| **JavaScript** | Sequelize, Prisma, TypeORM*, Bookshelf, MikroORM ✅ | Active Record / Data Mapper |
| **Python** | Django ORM | Active Record |
| **Ruby** | Rails ORM | Active Record |
| **Java** | Hibernate ✅ | Data Mapper |
| **PHP** | Doctrine ✅, Eloquent | Data Mapper / Active Record |
| **.NET** | Entity Framework ✅ | Data Mapper |

⭐ *Recomendado:* **MikroORM (JS)** — inspirado no Hibernate e Doctrine, maduro e com suporte a agregados limpos.

---

### 🧭 9. Conclusão

🧠 **Resumindo o capítulo:**

- Repositórios persistem agregados — não contêm lógica de domínio.  
- É necessário converter entre domínio e banco (Mapper).  
- ORMs influenciam fortemente a qualidade arquitetural.  
- **Data Mapper é o ideal para DDD.**  
- **Unit of Work** ajuda a manter consistência transacional.  
- Nem sempre é possível escolher o ORM — mas é essencial entender suas limitações.

---

### 📘 10. Roadmap Prático no Projeto

| Etapa | O que fazer | Ferramenta / Padrão |
|--------|--------------|----------------------|
| 1️⃣ | Criar um Repositório por Agregado | Interface + Implementação |
| 2️⃣ | Definir Mapper (toDomain / toPersistence) | Classe ou função utilitária |
| 3️⃣ | Escolher ORM | Preferir Data Mapper |
| 4️⃣ | Implementar Unit of Work (se possível) | Suporte nativo do ORM |
| 5️⃣ | Garantir isolamento do Domínio | Sem dependência de libs externas |
| 6️⃣ | Testar agregados sem banco | Usar mocks do repositório |
