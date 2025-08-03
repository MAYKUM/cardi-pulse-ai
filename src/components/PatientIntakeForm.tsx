import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, 
  Heart, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  AlertTriangle,
  Plus,
  X,
  Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const patientSchema = z.object({
  // Demographics
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
  
  // Medical Information
  chiefComplaint: z.string().min(5, "Chief complaint must be at least 5 characters"),
  currentSymptoms: z.array(z.string()).min(1, "At least one symptom must be selected"),
  symptomDuration: z.string().min(1, "Symptom duration is required"),
  painScale: z.number().min(0).max(10),
  
  // Medical History
  previousConditions: z.array(z.string()),
  currentMedications: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string()
  })),
  allergies: z.array(z.string()),
  familyHistory: z.array(z.string()),
  
  // Lifestyle
  smokingStatus: z.enum(["never", "former", "current"]),
  alcoholUse: z.enum(["none", "occasional", "moderate", "heavy"]),
  exerciseFrequency: z.enum(["none", "rare", "weekly", "daily"]),
  
  // Insurance & ID
  abhaId: z.string().optional(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

const cardiacSymptoms = [
  "Chest pain", "Shortness of breath", "Palpitations", "Dizziness", 
  "Fatigue", "Swelling in legs", "Irregular heartbeat", "Fainting"
];

const commonConditions = [
  "Hypertension", "Diabetes", "High cholesterol", "Heart disease", 
  "Stroke", "Kidney disease", "Thyroid disorder", "Asthma"
];

const commonMedications = [
  "Aspirin", "Metoprolol", "Lisinopril", "Atorvastatin", 
  "Metformin", "Amlodipine", "Warfarin", "Clopidogrel"
];

export function PatientIntakeForm() {
  const [currentTab, setCurrentTab] = useState("demographics");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [medications, setMedications] = useState<Array<{name: string, dosage: string, frequency: string}>>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      currentSymptoms: [],
      previousConditions: [],
      currentMedications: [],
      allergies: [],
      familyHistory: [],
      painScale: 0,
    },
  });

  const onSubmit = (data: PatientFormData) => {
    console.log("Patient data:", data);
    toast.success("Patient information saved successfully");
  };

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "" }]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updated = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updated);
    form.setValue("currentMedications", updated);
  };

  const toggleCondition = (condition: string) => {
    const updated = conditions.includes(condition) 
      ? conditions.filter(c => c !== condition)
      : [...conditions, condition];
    setConditions(updated);
    form.setValue("previousConditions", updated);
  };

  const toggleSymptom = (symptom: string) => {
    const updated = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter(s => s !== symptom)
      : [...selectedSymptoms, symptom];
    setSelectedSymptoms(updated);
    form.setValue("currentSymptoms", updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-card rounded-lg shadow-card border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">New Patient Intake</h1>
            <p className="text-muted-foreground">Complete patient registration and medical history</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="insurance">Insurance & ID</TabsTrigger>
              </TabsList>

              <TabsContent value="demographics" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter complete address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Name and phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="symptoms" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="h-5 w-5" />
                      <span>Current Symptoms</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="chiefComplaint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chief Complaint</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the main reason for today's visit" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel>Current Symptoms (Select all that apply)</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {cardiacSymptoms.map((symptom) => (
                          <div
                            key={symptom}
                            onClick={() => toggleSymptom(symptom)}
                            className={`p-2 rounded-md border cursor-pointer transition-colors ${
                              selectedSymptoms.includes(symptom)
                                ? "bg-primary-soft border-primary text-primary"
                                : "border-border hover:bg-muted"
                            }`}
                          >
                            <span className="text-sm">{symptom}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="symptomDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Symptom Duration</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                                <SelectItem value="weeks">Weeks</SelectItem>
                                <SelectItem value="months">Months</SelectItem>
                                <SelectItem value="years">Years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="painScale"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pain Scale (0-10)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="10" 
                                placeholder="0 = No pain, 10 = Severe pain"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Medical History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Previous Conditions */}
                    <div>
                      <FormLabel>Previous Medical Conditions</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {commonConditions.map((condition) => (
                          <div
                            key={condition}
                            onClick={() => toggleCondition(condition)}
                            className={`p-2 rounded-md border cursor-pointer transition-colors ${
                              conditions.includes(condition)
                                ? "bg-primary-soft border-primary text-primary"
                                : "border-border hover:bg-muted"
                            }`}
                          >
                            <span className="text-sm">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Medications */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <FormLabel>Current Medications</FormLabel>
                        <Button type="button" size="sm" onClick={addMedication}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Medication
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {medications.map((med, index) => (
                          <div key={index} className="flex space-x-2 items-start">
                            <Input
                              placeholder="Medication name"
                              value={med.name}
                              onChange={(e) => updateMedication(index, "name", e.target.value)}
                              className="flex-1"
                            />
                            <Input
                              placeholder="Dosage"
                              value={med.dosage}
                              onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                              className="w-24"
                            />
                            <Input
                              placeholder="Frequency"
                              value={med.frequency}
                              onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                              className="w-32"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => removeMedication(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lifestyle Factors */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="smokingStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Smoking Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="former">Former</SelectItem>
                                <SelectItem value="current">Current</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="alcoholUse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alcohol Use</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select usage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="occasional">Occasional</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="heavy">Heavy</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exerciseFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exercise Frequency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="rare">Rarely</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insurance" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Insurance & Identification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="abhaId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ABHA ID (Ayushman Bharat Health Account)</FormLabel>
                          <FormControl>
                            <Input placeholder="12-3456-7890-1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="insuranceProvider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Provider</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="icici">ICICI Lombard</SelectItem>
                                <SelectItem value="star">Star Health</SelectItem>
                                <SelectItem value="bajaj">Bajaj Allianz</SelectItem>
                                <SelectItem value="hdfc">HDFC ERGO</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="policyNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Policy Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter policy number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-6 border-t mt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  const tabs = ["demographics", "symptoms", "history", "insurance"];
                  const currentIndex = tabs.indexOf(currentTab);
                  if (currentIndex > 0) {
                    setCurrentTab(tabs[currentIndex - 1]);
                  }
                }}
                disabled={currentTab === "demographics"}
              >
                Previous
              </Button>
              
              {currentTab === "insurance" ? (
                <Button type="submit" className="bg-gradient-to-r from-primary to-accent">
                  <Save className="h-4 w-4 mr-2" />
                  Save Patient
                </Button>
              ) : (
                <Button 
                  type="button"
                  onClick={() => {
                    const tabs = ["demographics", "symptoms", "history", "insurance"];
                    const currentIndex = tabs.indexOf(currentTab);
                    if (currentIndex < tabs.length - 1) {
                      setCurrentTab(tabs[currentIndex + 1]);
                    }
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}