# JupiterOne data model for Governance, Risk, and Compliance (GRC)

<iframe src="https://my.mindnode.com/2ayndotqvjEJ3qAeEfwyy6sgkRciyxRvH1sgpYw4/em#333.4,207.2,-2" frameborder="0" marginheight="0" marginwidth="0" style="border: 1px solid rgb(204, 204, 204); width: 720px; height: 720px;" onmousewheel=""></iframe>

## Standards, sections, requirements

**Standards** are, broadly, compliance frameworks, regulations, or industry best practices. 

    Examples of standards include: HIPAA, ISO 27001, PCI-DSS,  FedRAMP, etc.

> A **standard** _has_ one or more **sections**.

**Sections** can be considered as parts or components of a standard. 

    Examples of sections include: HIPAA Physical Safeguards (§164.310), ISO 27001 Clause 6, PCI-DSS Requirement 8, or the Access Control (AC) Family within FedRAMP.

> A **standard** _has_ one or more **sections**; a **section** _has_ one or more
> **requirements**.

**Requirements** make up sections of a standard. Individual requirements outline
the specification that needs to be met. 

    Examples of requirements include: HIPAA §164.310(a)(1)(i), ISO 27001 6.1.3 a, PCI-DSS 8.4.b, or FedRAMP AC-2 (7).

## Policies, procedures, controls, control policies/configurations, vendors

You can think of an organization’s policies, procedures, and controls to loosely
align to the compliance or regulatory standards, sections, and requirements.

**Policies** are high-level statements of management intent; they are written
security documents which frequently satisfy external requirements. 

    Examples of policies include: access management policies, data protection policies, human resource policies.

> **Policies** are _implemented_ by **procedures**. 

**Procedures** are written security documents which describe how to implement
policies via processes; the ‘who’, ‘what’, ‘when’, ‘how’, etc; they can be
thought of as control or process descriptions. 

    Examples of procedures include procedures around: password management, protecting data at rest, and employee screening.

> **Policies** are _implemented_ by **procedures**; **controls** _implement_
> **procedures**. 

**Controls** are the technical, administrative, and physical safeguards that
enforce the procedures; they can manifest commonly as a process managed by a
person/team or as a product/service provided by a vendor. 

    Examples of controls include: password settings, data encryption at rest or in transit,  and pre-employment background checks.

> A **controlPolicy** or **configuration** _enforces_ or _manages_ a
> **control**.

**Control Policies** or **configurations** are the technical settings whereby
controls are implemented. 

    Examples of control policies or configurations include: requiring 12+ characters including a number + a symbol for all passwords, using AES-256 cipher for encryption at rest, and for background checks, specifically looking at federal, criminal, state, county, city, financial, education checks.

> **Vendors** _provide_ **controls**. 

Vendors are frequently companies, organizations, or people that provide the controls

    Examples of vendors include Microsoft Active Directory’s (AD) Group Policy Objects (GPO) for password requirements, Amazon Web Services’ (AWS) Key Management Service (KMS) for encryption at rest, or Checkr for background screens.

> **Policies** are _implemented_ by **procedures**; **controls** _implement_
> **procedures**. A **controlPolicy** or **configuration** _enforces_ or
> _manages_ a **control**.

> **Policies** are _implemented_ by **procedures**; **controls** _implement_
> **procedures**. **Vendors** _provide_ **controls**. 
