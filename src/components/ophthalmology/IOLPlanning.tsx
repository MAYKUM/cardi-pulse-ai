import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Target, Eye, Settings, TrendingUp, FileText } from "lucide-react";

const IOLPlanning: React.FC = () => {
  useEffect(() => {
    document.title = "IOL Planning | Ophthalmology";
  }, []);

  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedEye, setSelectedEye] = useState("OD");
  const [axialLength, setAxialLength] = useState("23.45");
  const [cornealPower, setCornealPower] = useState("44.25");
  const [acd, setAcd] = useState("3.15");
  const [targetRefraction, setTargetRefraction] = useState("0.00");

  const biometryData = {
    axialLength: "23.45 mm",
    cornealPowerK1: "44.25 D @ 180°",
    cornealPowerK2: "44.75 D @ 90°",
    acd: "3.15 mm",
    lensThickness: "4.2 mm",
    wtwDistance: "11.8 mm",
    cornealAstigmatism: "-0.50 D × 90°"
  };

  const iolCalculations = [
    { formula: "SRK/T", power: 21.5, predictedRefraction: "+0.12", sphericalEquivalent: "+0.12" },
    { formula: "Barrett Universal II", power: 21.0, predictedRefraction: "-0.05", sphericalEquivalent: "-0.05" },
    { formula: "Haigis", power: 21.5, predictedRefraction: "+0.18", sphericalEquivalent: "+0.18" },
    { formula: "Holladay 1", power: 21.5, predictedRefraction: "+0.22", sphericalEquivalent: "+0.22" },
    { formula: "Kane", power: 21.0, predictedRefraction: "-0.08", sphericalEquivalent: "-0.08" }
  ];

  const toricCalculations = [
    { cylinderPower: "1.0 D", axis: "90°", residualAstigmatism: "0.1 D × 85°" },
    { cylinderPower: "1.5 D", axis: "90°", residualAstigmatism: "0.3 D × 95°" },
    { cylinderPower: "2.0 D", axis: "90°", residualAstigmatism: "0.5 D × 85°" }
  ];

  const iolModels = [
    { name: "AcrySof IQ", type: "Monofocal", material: "Hydrophobic Acrylic", aConstant: 119.3 },
    { name: "AcrySof IQ Toric", type: "Toric", material: "Hydrophobic Acrylic", aConstant: 119.3 },
    { name: "PanOptix", type: "Trifocal", material: "Hydrophobic Acrylic", aConstant: 119.3 },
    { name: "ReSTOR +3.0", type: "Multifocal", material: "Hydrophobic Acrylic", aConstant: 119.1 }
  ];

  return (
    <main className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Biometry & IOL Planning
        </h1>
        <p className="text-muted-foreground mt-2">
          Advanced IOL calculations with multiple formulas and toric planning
        </p>
      </header>

      {/* Patient Selection */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Patient Selection</CardTitle>
            <div className="flex gap-4">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mohammed-ali">Mohammed Ali (Age 71)</SelectItem>
                  <SelectItem value="ravi-kumar">Ravi Kumar (Age 62)</SelectItem>
                  <SelectItem value="sunita-devi">Sunita Devi (Age 68)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedEye} onValueChange={setSelectedEye}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OD">OD</SelectItem>
                  <SelectItem value="OS">OS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Biometry Input */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Biometry Data
            </CardTitle>
            <CardDescription>IOLMaster 700 measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="axial-length">Axial Length (mm)</Label>
              <Input
                id="axial-length"
                value={axialLength}
                onChange={(e) => setAxialLength(e.target.value)}
                placeholder="23.45"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="corneal-power">Mean Corneal Power (D)</Label>
              <Input
                id="corneal-power"
                value={cornealPower}
                onChange={(e) => setCornealPower(e.target.value)}
                placeholder="44.25"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acd">ACD (mm)</Label>
              <Input
                id="acd"
                value={acd}
                onChange={(e) => setAcd(e.target.value)}
                placeholder="3.15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-refraction">Target Refraction</Label>
              <Input
                id="target-refraction"
                value={targetRefraction}
                onChange={(e) => setTargetRefraction(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Additional Measurements</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>K1:</span>
                  <span>{biometryData.cornealPowerK1}</span>
                </div>
                <div className="flex justify-between">
                  <span>K2:</span>
                  <span>{biometryData.cornealPowerK2}</span>
                </div>
                <div className="flex justify-between">
                  <span>WTW:</span>
                  <span>{biometryData.wtwDistance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Astigmatism:</span>
                  <span>{biometryData.cornealAstigmatism}</span>
                </div>
              </div>
            </div>

            <Button className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate IOL Power
            </Button>
          </CardContent>
        </Card>

        {/* IOL Calculations */}
        <Card className="col-span-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              IOL Power Calculations
            </CardTitle>
            <CardDescription>Multiple formulas for optimal accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="spherical" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="spherical">Spherical IOLs</TabsTrigger>
                <TabsTrigger value="toric">Toric IOLs</TabsTrigger>
                <TabsTrigger value="premium">Premium IOLs</TabsTrigger>
              </TabsList>

              <TabsContent value="spherical">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Formula</TableHead>
                      <TableHead>IOL Power</TableHead>
                      <TableHead>Predicted Refraction</TableHead>
                      <TableHead>Recommendation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {iolCalculations.map((calc, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{calc.formula}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{calc.power} D</Badge>
                        </TableCell>
                        <TableCell>{calc.predictedRefraction}</TableCell>
                        <TableCell>
                          {Math.abs(parseFloat(calc.predictedRefraction)) < 0.25 && (
                            <Badge className="bg-success text-success-foreground">Excellent</Badge>
                          )}
                          {Math.abs(parseFloat(calc.predictedRefraction)) >= 0.25 && (
                            <Badge variant="secondary">Good</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Recommended IOL Power</h4>
                  <p className="text-2xl font-bold text-primary">21.0 D</p>
                  <p className="text-sm text-muted-foreground">Based on Barrett Universal II formula</p>
                  <p className="text-sm text-muted-foreground">Expected outcome: -0.05 D</p>
                </div>
              </TabsContent>

              <TabsContent value="toric">
                <div className="space-y-4">
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <h4 className="font-medium text-accent mb-2">Corneal Astigmatism</h4>
                    <p className="text-lg font-semibold">-0.50 D × 90°</p>
                    <p className="text-sm text-muted-foreground">Correction recommended for better uncorrected vision</p>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cylinder Power</TableHead>
                        <TableHead>Axis</TableHead>
                        <TableHead>Residual Astigmatism</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {toricCalculations.map((calc, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge variant="outline">{calc.cylinderPower}</Badge>
                          </TableCell>
                          <TableCell>{calc.axis}</TableCell>
                          <TableCell>{calc.residualAstigmatism}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Select</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="premium">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {iolModels.map((iol, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{iol.name}</CardTitle>
                          <CardDescription>
                            <Badge variant="secondary" className="mr-2">{iol.type}</Badge>
                            {iol.material}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>A-Constant:</span>
                              <span>{iol.aConstant}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Calculated Power:</span>
                              <span className="font-medium">21.0 D</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Surgical Planning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Surgical Planning Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Pre-operative Considerations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Dense nuclear sclerosis grade 3</li>
                <li>• Corneal astigmatism suitable for toric correction</li>
                <li>• Good pupil dilation expected</li>
                <li>• No posterior synechiae observed</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Recommended Approach</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 2.4mm clear corneal incision at 120°</li>
                <li>• Toric IOL alignment at 90° axis</li>
                <li>• Consider capsular tension ring if needed</li>
                <li>• Target slight myopia for intermediate vision</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Surgery Plan
            </Button>
            <Button variant="outline">Print Calculations</Button>
            <Button variant="outline">Save Template</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default IOLPlanning;
