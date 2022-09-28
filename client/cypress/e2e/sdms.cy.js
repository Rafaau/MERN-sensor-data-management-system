describe('HOME PAGE', () => {

  beforeEach(() => {
    cy.login("Test@test.com", "Test")
  })

  it("Home page renders correctly", () => {
    cy.visit('/')
    cy.get("#home-test-confirmer").should("exist")
  })

  it("Redirect to insert page", () => {
    cy.visit('/')
    cy.get("#test-insert-link").click()
    cy.url().should("equal", "http://localhost:8000/sensordata/insert")
    cy.get("#insert-test-confirmer").should("exist")
  })

  it("Create reading by inserting", () => {
    cy.visit("/sensordata/insert")
    cy.get("#test-insert-button").click()
    cy.get("#test-insert-name", { timeout: 10000 }).type("Test")
    cy.get("#test-insert-label1").type("X")
    cy.get("#test-timestamp-0").type("2022-09-28 21:37:32")
    cy.get("#test-timestamp-1").type("2022-09-28 21:37:33")
    cy.get("#test-milliseconds-0").type("0")
    cy.get("#test-milliseconds-1").type("101")
    cy.get("#test-value1-0").type("5.0")
    cy.get("#test-value1-1").type("11.0")
    cy.get("#test-preview-button").click()
    cy.get("#test-chart").should("be.visible")
    cy.get("#test-send-button").click()
    cy.url({ timeout: 10000 }).should("equal", "http://localhost:8000/sensordata/list")
    cy.contains("Test")
  })

  it("Check inserted reading", () => {
    cy.visit("/sensordata/list")
    cy.contains("Test").click()
    cy.contains("Test")
  })

  it("Remove inserted reading", () => {
    cy.visit("/sensordata/list")
    cy.get("#test-remove-button").click()
    cy.get("#test-confirm-button").click()
    cy.contains("Test").not()
  })

  it("Create reading by .csv file", () => {
    cy.visit("/sensordata/insert")
    cy.get("#test-csv-button").click()
    cy.get("#test-input-file", { timeout: 10000 } ).selectFile("cypress/e2e/Test3.csv", { force: true })
    cy.get("#test-preview-button").click()
    cy.get("#test-chart").should("be.visible")
    cy.get("#test-send-button").click()
    cy.url({ timeout: 10000 }).should("equal", "http://localhost:8000/sensordata/list")
    cy.contains("Test3")
  })

  it("Check csv reading", () => {
    cy.visit("/sensordata/list")
    cy.contains("Test3").click()
    cy.contains("Test3")
  })

  it("Remove csv reading", () => {
    cy.visit("/sensordata/list")
    cy.get("#test-remove-button").click()
    cy.get("#test-confirm-button").click()
    cy.contains("Test3").not()
  })

  it("Create reading by JSON", () => {
    cy.visit("/sensordata/insert")
    cy.get("#test-json-button").click()
    cy.get("#test-json-area", { timeout: 10000 }).type(JSON.stringify(json), { parseSpecialCharSequences: false })
    cy.get("#test-preview-button").click()
    cy.get("#test-chart").should("be.visible")
    cy.get("#test-send-button").click()
    cy.url({ timeout: 10000 }).should("equal", "http://localhost:8000/sensordata/list")
    cy.contains("Test2")
  })

  it("Check JSON reading", () => {
    cy.visit("/sensordata/list")
    cy.contains("Test2").click()
    cy.contains("Test2")
  })

  it("Remove JSON reading", () => {
    cy.visit("/sensordata/list")
    cy.get("#test-remove-button").click()
    cy.get("#test-confirm-button").click()
    cy.contains("Test2").not()
  })

})

const json = [
	{
		"name": "Test2",
		"timestamp": "2020-03-22 16:56:22",
		"milliseconds": "0",
		"x": "7.0",
		"y": "25.0",
		"z": "11.0"
	},
	{
		"name": "Test2",
		"timestamp": "2020-03-22 16:56:23",
		"milliseconds": "101",
		"x": "4.0",
		"y": "19.0",
		"z": "9.0"
	}
]