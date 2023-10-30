import courseService, { CourseService } from "../../src/service/courseService"
import successEnums from "../../src/constants/successConstant"

let courseServices: CourseService;

beforeAll(async () => {
    courseServices = new courseService();
});

afterAll(async () => {
    const courses = await courseServices.getCourses();
    const deletionPromises = courses.map(async (course: any) => {
        let Id = course.course_id;
        await courseServices.deleteCourse(Id);
    });
    await Promise.all(deletionPromises);
});

describe('courseService', () => {

    it('should create a new course', async () => {
        let newCourse = {
            name: 'CPP',
            description: 'This course is for C++.',
        };
        let createdCourse = await courseServices.createCourse(
            newCourse.name,
            newCourse.description
        );
        expect(createdCourse.dataValues.name).toBe(newCourse.name);
        expect(createdCourse.dataValues.description).toBe(newCourse.description);
    });

    it('should fetch courses', async () => {
        const courses = await courseServices.getCourses();
        expect(courses).toBeDefined();
    });

    it('should fetch a course by ID', async () => {
        let newCourse = {
            name: 'CPP',
            description: 'This course is for C++.',
        };
        let createdCourse = await courseServices.createCourse(
            newCourse.name,
            newCourse.description
        );
        let courseId = createdCourse.dataValues.course_id;
        let course = await courseServices.getCourseById(courseId);
        expect(course.dataValues.name).toBe(newCourse.name);
        expect(course.dataValues.description).toBe(newCourse.description);
    });

    it('should update a course', async () => {
        let newCourse = {
            name: 'CPP',
            description: 'This course is for C++.',
        };
        let createdCourse = await courseServices.createCourse(
            newCourse.name,
            newCourse.description
        );
        expect(createdCourse.dataValues.name).toBe(newCourse.name);
        expect(createdCourse.dataValues.description).toBe(newCourse.description);

        let courseId = createdCourse.dataValues.course_id;
        const updatedCourseData = {
            description: 'Learn CPP.',
        };
        const updatedCourse = await courseServices.updateCourse(courseId, updatedCourseData);
        expect(updatedCourse).toBe(successEnums.UPDATE_SUCCESS);
    });

    it('should delete a course', async () => {
        let newCourse = {
            name: 'CPP',
            description: 'This course is for C++.',
        };
        let createdCourse = await courseServices.createCourse(
            newCourse.name,
            newCourse.description
        );
        expect(createdCourse.dataValues.name).toBe(newCourse.name);
        expect(createdCourse.dataValues.description).toBe(newCourse.description);

        let courseId = createdCourse.dataValues.course_id;
        const courseDeleted = await courseServices.deleteCourse(courseId);
        expect(courseDeleted).toBe(successEnums.DELETE_SUCCESS);
    });
});
