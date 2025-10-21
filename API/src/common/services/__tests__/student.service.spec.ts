import { describe, it, expect, vi, beforeEach } from "vitest";
import { StudentService } from "../../../student/services/student.service";
import { CreateStudentForm } from "../../../student/forms/student.form";
import { PaginationForm } from "../../forms/pagination.form";

describe("StudentService", () => {
  const mockRepo = {} as any;
    mockRepo.findAllStudent = vi.fn();
    mockRepo.create = vi.fn();
    mockRepo.update = vi.fn();
    mockRepo.delete = vi.fn();

  let studentService: StudentService;

  beforeEach(() => {
    vi.restoreAllMocks();
    studentService = new StudentService(mockRepo as any);
  });

  it("should list all students", async () => {
    const paginationForm: PaginationForm = {
      page: 1,
      limit: 10,
      sortBy: [{ key: "name", order: "asc" }],
      search: "",
    };

    const mockResponse = {
      data: [{ id: 1, name: "Alice" }],
      page: 1,
      limit: 10,
      totalItems: 1,
      totalPages: 1,
    };

    mockRepo.findAllStudent.mockResolvedValue(mockResponse);

    const result = await studentService.list(paginationForm);

    expect(mockRepo.findAllStudent).toHaveBeenCalledOnce();
    expect(mockRepo.findAllStudent).toHaveBeenCalledWith({
      ...paginationForm,
      page: 1,
      limit: 10,
      sortBy: [{ key: "name", order: "asc" }],
    });

    expect(result.data).toBeDefined();
    expect(result.data).toHaveLength(1);
    expect(result.data?.[0]?.name).toBe("Alice");
  });

  it("should create a student", async () => {
    const mockStudent: CreateStudentForm = {
      name: "Bob",
      email: "bob@example.com",
      studentRegistration: "REG123",
      document: "12345678900",
    };

    mockRepo.create.mockResolvedValue({ id: 1, ...mockStudent });

    const result = await studentService.create(mockStudent);

    expect(mockRepo.create).toHaveBeenCalledWith(mockStudent);
    expect(result.name).toBe("Bob");
    expect(result.email).toBe("bob@example.com");
  });

  it("should update a student", async () => {
        const updateData = {
            name: "Updated Bob",
            email: "updated.bob@example.com",
            studentRegistration: "REG456",
            document: "98765432100",
        };

        const updatedStudent = { id: 1, ...updateData };

        mockRepo.update.mockResolvedValue(updatedStudent);

        const result = await studentService.update(1, updateData);

        expect(mockRepo.update).toHaveBeenCalledWith(1, updateData);
        expect(result).not.toBeNull();
        expect(result!.name).toBe("Updated Bob");
        expect(result!.email).toBe("updated.bob@example.com");
    });

  it("should remove a student", async () => {
    mockRepo.delete.mockResolvedValue({ id: 1 });

    const result = await studentService.delete(1);

    expect(mockRepo.delete).toHaveBeenCalledWith(1);
    expect(result);
  });
});