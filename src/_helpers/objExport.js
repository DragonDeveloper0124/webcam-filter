import OBJExporter from "three-obj-exporter"

const exporter = new OBJExporter()

const parseMesh = mesh => exporter.parse(mesh)

export default { parseMesh }
